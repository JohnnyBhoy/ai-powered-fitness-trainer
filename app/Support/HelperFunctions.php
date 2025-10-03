<?php

namespace App\Support;

use App\Models\GpfConsent;
use App\Models\GpfMessage;
use App\Models\GpfSubscription;
use App\Models\GpfTraineeProgress;
use App\Repositories\MessageRepository;
use App\Services\TrialProgramService;
use Carbon\Carbon;
use DateTime;
use Illuminate\Support\Facades\DB;

class HelperFunctions
{
    protected $message;
    protected $trialProgramService;

    public function __construct(MessageRepository $message, TrialProgramService $trialProgramService)
    {
        $this->message = $message;
        $this->trialProgramService = $trialProgramService;
    }

    /**
     * Summary of updateSubscriptionOnPaymentSuccess
     * @param mixed $session
     * @return bool
     */
    public function updateSubscriptionOnPaymentSuccess($session): bool
    {
        return GpfSubscription::where('session_id', $session->id)->update([
            'payment_status' => $session->payment_status,
            'status' => $session->status,
            'payment_intent_id' => $session->payment_intent ?? $session->subscription,
            'customer_id' => $session->customer ?? $session->created,
        ]);
    }

    /**
     * Summary of createInitialConversation
     * @param mixed $userId
     * @param mixed $initialMessage
     * @return bool
     */
    public function createInitialConversation($userId, $initialMessage): bool
    {
        return GpfMessage::where('user_id', $userId)
            ->update(['conversations' => "GPF: $initialMessage"]);
    }

    /**
     * Summary of getMonthlyUserCountByRole
     * @param mixed $role
     * @param mixed $trainerId
     * @return \Illuminate\Support\Collection
     */
    public function getMonthlyUserCountByRole($role, $trainerId)
    {
        $currentYear = Carbon::now()->year;

        $query =  DB::table('users')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as total'))
            ->where('role', $role)
            ->whereYear('created_at', $currentYear);

        // For GoPeakFit Users, not added by trainer
        if ($trainerId == null) {
            $query = $query->where('trainer_id', null);
        }

        // Final Query
        $usersByMonth = $query->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('total', 'month');

        // Create array for all 12 months initialized to 0
        return collect(range(1, 12))->mapWithKeys(function ($monthNumber) use ($usersByMonth) {
            $monthName = Carbon::create()->month($monthNumber)->format('F');
            return [$monthName => $usersByMonth[$monthNumber] ?? 0];
        });
    }

    /**
     * Summary of generateOTP
     * @return string
     */
    public function generateOTP(): string
    {
        return str_pad(strval(random_int(1, 999999)), 6, '0', STR_PAD_LEFT);
    }


    /**
     * Summary of prependPlusOneIfNumberHasNo
     * @param mixed $phone
     */
    public function prependPlusOneIfNumberHasNo($phone): mixed
    {
        if (strlen($phone) == 10 || strpos($phone, '+1') !== 0) {
            $phone = "+1$phone";
        }

        return $phone;
    }

    /**
     * Summary of createConsent
     * @param mixed $request
     */
    public function createConsent($request): mixed
    {
        return GpfConsent::insert([
            'phone_number' => $request->phone,
            'consent_status' => 'granted',
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
            'consent_text' => 'I agree to receive text messages from GoPeakFit with updates, promotions, and notifications. Message and data rates may apply. Reply STOP to unsubscribe at any time.',
            'created_at' => now(),
        ]);
    }

    /**
     * Summary of getTimeOfTheDay
     * Return time of the day, to be used in sms greetings and messages update
     * @return string
     */
    public function getTimeOfTheDay(): string
    {
        date_default_timezone_set('America/Denver');
        $today = new DateTime();
        $hour = (int) $today->format('G'); // 0 - 23

        // Define time segments
        if ($hour >= 3 && $hour < 12) {
            $timeOfDay = 'morning';
        } elseif ($hour >= 12 && $hour < 17) {
            $timeOfDay = 'afternoon';
        } else {
            $timeOfDay = 'evening';
        }

        return $timeOfDay;
    }

    /**
     * Summary of getDaysSinceAccountCreated
     * return account days old (to be use in 5 days program)
     * @param string $created The date where user is created
     * @return int
     */
    public function getDaysSinceAccountCreated($created): mixed
    {
        $today = new DateTime();

        $createdDate = new DateTime($created);
        $interval = $today->diff($createdDate);

        return $interval->days + 1;
    }

    /**
     * Summary of generatePrompt
     * @param mixed $user
     * @return string
     */
    public function generatePrompt($user): string
    {
        $strictnessLevel = $this->getStrictnessLevel($user->strictness_level);
        $daysSinceAccountCreated = $this->getDaysSinceAccountCreated($user->created_at);
        $trialPogramData = $this->trialProgramService->find($daysSinceAccountCreated);
        $workout = implode(",", $trialPogramData->workout);

        $ubscribedInstruction = "1. Personalize the workout and nutrition advice for {$user->first_name}.
        2. Stay supportive, realistic, and practical.
        3. Use {$user->equipment_access} equipment for workouts.
        4. Avoid foods that cause allergies.
        5. Provide ways to overcome struggles and past obstacles.
        6. Emphasize sustainability and consistency over intensity.
        7. Respond in a conversational, coach-like tone.
        8. Keep responses concise and text-message-friendly (under 300 characters when possible).
        9. Use a {$strictnessLevel} approach for their training plan.";

        $inTrialInstruction = "Reply based on the given trail program by day
        1. Program name : $trialPogramData->program_name
        2. Day: $trialPogramData->day
        3. Focus: $trialPogramData->focus
        4. Warm up: $trialPogramData->warm_up
        5. Todays workout : $workout
        6. Cool down: $trialPogramData->cool_down
        7. Alignment: $trialPogramData->alignment

        NOTE: Please based your sms reply on this program and REPLY SHORT IF INCOMING SMS IS SHORT AND LONG IF
        TRAINEE WANT A LONG OR BASED ON ITS CONVERSATION.
        ";

        $instruction = $daysSinceAccountCreated <= 5 ? $inTrialInstruction : $ubscribedInstruction;

        return  trim("Act as an expert Workout Fitness Coach, expert Dietician and expert Nutritionist.
        Your mission is to help {$user->first_name} reach their health goals with
        safe, personalized, and realistic advice.

        User Profile:
        - Age: {$user->age} years
        - Sex: {$user->sex}
        - Current Weight: {$user->current_weight} lbs
        - Goal Weight: {$user->goal_weight} lbs
        - Fitness Level: {$user->fitness_level}
        - Equipment Access: {$user->equipment_access}
        - Food Allergies: {$user->food_allergies}
        - Primary Goal: {$user->goal}
        - Motivation (Why): {$user->why}
        - Past Obstacles: {$user->past_obstacles}
        - Current Struggles: {$user->current_struggles}

        Instructions: $instruction.
        
        Always prioritize safety, avoid motivational reply at the end and never suggest dangerous practices

        NOTE: MAKE YOUR RESPONSE LIKE HAVING A CASUAL CONVERSATION TO TRAINEE, MAKE IT SHORT AND PRECISE AS POSSIBLE.
    ");
    }

    /**
     * Summary of getStrictnessLevel
     * Return a string equivalent of a strictness level (number is being save in db for storage reason)
     * @param mixed $level
     * @return string
     */
    private function getStrictnessLevel($level): string
    {
        $result = '';

        if ($level == 1) {
            $result =  'Chill: General meal guidelines (no tracking)';
        }

        if ($level == 2) {
            $result = 'Balanced: Macro targets with suggested portions';
        }

        if ($level == 3) {
            $result =  'Strict: Precise calorie/macro tracking with specific food weights';
        }

        return $result;
    }

    /**
     * Summary of saveNewWeight
     * @param mixed $id
     * @param mixed $message
     * @return void
     */
    public function saveNewWeight($id, $message)
    {
        $now = new DateTime();
        $now->format('Y-m-d H:i:s');

        if (preg_match('/\d+/', $message, $matches)) {
            $weight = (int)$matches[0];
        }

        try {
            GpfTraineeProgress::create([
                'user_id' => $id,
                'weight_lbs' => $weight,
                'body_fat_percent' => 0,
                'muscle_mass_lbs' => 0,
                'recorded_at' => $now,
                'notes' => $message,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Summary of replyIsNewWeight
     * @param mixed $message
     * @return bool
     */
    public function replyIsNewWeight($message)
    {
        return stripos($message, 'lbs') || preg_match('/\d+(\.\d+)?/', $message);
    }

    /**
     * Summary of getTrialDay
     * @param mixed $isPromo
     * @return int|string
     */
    public function getTrialDay($isPromo): int|string
    {
        return $isPromo == 1 ? '30' : '5';
    }

    /**
     * Summary of getLatestWeightQuestion
     * @param mixed $trialDay
     * @return string
     */
    public function getLatestWeightQuestion($trialDay)
    {
        return "As your $trialDay-Day Trial comes to a close, we’d like to record your current weight. This will help us assess your progress and determine the next steps to support you in achieving your desired weight. Please reply with your weight in lbs.";
    }

    /**
     * Summary of getDayBeforeTrialExpired
     * @param mixed $isPromo
     * @return int
     */
    public function getDayBeforeTrialExpired($isPromo): int|string
    {
        return $isPromo == 1 ?  29 : 4;
    }

    /**
     * Summary of geteNewWeightQuestion
     * @return string
     */
    public function getNewWeightQuestion()
    {
        return "As your weekly program comes to end, we’d like to record your current weight. This will help us assess your progress and determine the next steps to support you in achieving your desired weight. Please reply with your weight in lbs.";
    }

    /**
     * Summary of getNewWeight
     * @param mixed $id
     * @param mixed $currentWeight
     * @return float|int
     */
    public function getNewWeight($id, $currentWeight): float|int
    {
        $newWeight = GpfTraineeProgress::where('user_id', $id)->value('weight_lbs');

        return $currentWeight - $newWeight;
    }

    
    /**
     * Summary of timeToUpdateCurrentWeight
     * @param mixed $daysSinceAccountCreated
     * @param mixed $timeOfDay
     * @param mixed $user
     * @return bool
     */
    public function timeToUpdateCurrentWeight($daysSinceAccountCreated, $timeOfDay, $user): bool
    {
        return ($daysSinceAccountCreated == 4 && $timeOfDay == 'evening' && $user->is_promo == 0)
            || ($daysSinceAccountCreated == 29 && $timeOfDay == 'evening' && $user->is_promo == 1);
    }


    /**
     * Summary of isTrialExpire
     * @param mixed $daysSinceAccountCreated
     * @param mixed $user
     * @return bool
     */
    public function isTrialExpire($daysSinceAccountCreated, $user): bool
    {
        return ($daysSinceAccountCreated == 5 && $user->is_promo == 0 && $user->subscription == 'trial')
            || ($daysSinceAccountCreated == 30 && $user->is_promo == 1);
    }

    /**
     * Summary of isPremiumOrPromo
     * @param mixed $user
     * @param mixed $daysSinceAccountCreated
     * @return bool
     */
    public function isPremiumOrPromo($user, $daysSinceAccountCreated)
    {
        return ($user->subscription != 'trial' && $user->payment_status == 'paid') || ($user->is_promo == 1 && $daysSinceAccountCreated < 30);
    }
}
