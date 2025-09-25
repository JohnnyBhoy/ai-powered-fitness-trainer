<?php

namespace App\Services;

use App\Repositories\MessageRepository;
use App\Support\HelperFunctions;
use Twilio\Rest\Client;

class MessageService
{
    protected $helpers;
    protected $programService;
    protected $messageRepository;
    protected $trialProgramService;
    protected $traineeProgressService;
    protected $userService;

    public function __construct(
        HelperFunctions $helpers,
        ProgramService $programService,
        MessageRepository $messageRepository,
        TrialProgramService $trialProgramService,
        TraineeProgressService $traineeProgressService,
        UserService $userService,
    ) {
        $this->helpers = $helpers;
        $this->programService = $programService;
        $this->messageRepository = $messageRepository;
        $this->trialProgramService = $trialProgramService;
        $this->traineeProgressService = $traineeProgressService;
        $this->userService = $userService;
    }

    /**
     * Summary of create
     * @param array $data
     * @return \App\Models\GpfMessage
     */
    public function create(array $data)
    {
        return $this->messageRepository->create($data);
    }

    /**
     * Summary of dailyMessageUpdates
     * @param int $userId
     * @param string $subscription
     * @param int $day
     * @param string $firstName
     * @param string $phoneNumber
     * @param float $currentWeight
     * @return string
     */
    public function dailyMessageUpdates(Int $userId, String $subscription, Int $day, String $firstName, String $phoneNumber, Float $currentWeight): string
    {
        $message = '';
        $timeOfTheDay = $this->helpers->getTimeOfTheDay();

        if ($subscription === 'trial') {
            $todaysWorkout = $this->trialProgramService->find($day);
            $message = $this->getDailyMessage($todaysWorkout, $firstName, $timeOfTheDay);
        }

        if ($subscription === 'premium') {
            $todaysWorkout = $this->programService->getProgramByDay($userId, $day);
            $message = $this->getDailyMessage($todaysWorkout, $firstName, $timeOfTheDay);
        }

        // Ask the latest trainee weight in the evening on the last day of weekly program
        if ($timeOfTheDay == 'evening' && $todaysWorkout->day == 7) {
            $this->sendSms(
                $phoneNumber,
                $this->helpers->getNewWeightQuestion()
            );

            $this->sendCongratulationsOnWeeklyProgress(
                $phoneNumber,
                $firstName,
                $currentWeight,
                $userId
            );
        }

        return $message;
    }

    /**
     * Summary of sendSms
     * @param mixed $to
     * @param mixed $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSms($to, $message)
    {
        $sid = config('services.twilio.sid');
        $token = config('services.twilio.token');
        $twilioPhoneNumber = config('services.twilio.phone');

        $twilio = new Client($sid,  $token);

        try {
            $twilio->messages->create(
                $to,
                [
                    'from' => $twilioPhoneNumber,
                    'body' => $message,
                ]
            );
            return response()->json(['status' => 'Message sent successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Summary of getDailyMessage
     * @param mixed $todaysWorkout
     * @param string $firstName
     * @param string $timeOfTheDay
     * @return string
     */
    private function getDailyMessage(Mixed $todaysWorkout, String $firstName, String $timeOfTheDay)
    {
        $messages = '';

        switch ($timeOfTheDay) {
            case 'morning':
                $messages = "Good morning {$firstName} ☀️
                            Today is Day {$todaysWorkout->day} of your {$todaysWorkout->program_name} program.

                            Here’s your plan:
                            1. Focus: {$todaysWorkout->focus}
                            2. Warm-up: {$todaysWorkout->warm_up}
                            3. Workout: {$todaysWorkout->workout}
                            4. Cool down: {$todaysWorkout->cool_down}
                            5. Alignment: {$todaysWorkout->alignment}

                            Stay consistent 💪🔥 You’ve got this!";
                break;

            case 'afternoon':
                $messages = "Good afternoon {$firstName} 🌞.Hope your day is going well! Remember to stay on track with your Day {$todaysWorkout->day} program. Keep pushing—you’re doing awesome 🚀";
                break;

            case 'evening':
                $messages = "Good evening {$firstName} 🌙. The day’s almost over—make sure you’ve done your Day {$todaysWorkout->day} session. End the day strong 💪🔥 You got this!";
                break;

            case 'midnight':
                $messages = "Hello {$firstName} 🌌. It’s late, but consistency is key. If you missed today’s workout, you can still make it count before the day ends. Stay disciplined 🔥";
                break;

            default:
                $messages = 'Happy Workout';
        }

        return $messages;
    }

    /**
     * Summary of sendCongratulationsOnWeeklyProgress
     * Return message when the trial program is ended (5 or 30 days)
     * @param mixed $phoneNumber
     * @param mixed $firstName
     * @param mixed $currentWeight
     * @param mixed $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendCongratulationsOnWeeklyProgress($phoneNumber, $firstName, $currentWeight, $userId)
    {
        $newWeight = $this->helpers->getNewWeight($userId, $currentWeight);

        // Evaluation greetings if the user lost or gained weight this week
        if ($newWeight > 0) {
            $weightEvaluation = "Congratulations on your weekly progress — you’ve lost {$newWeight} lbs this week! That’s a strong step toward reaching your long-term goals.";
        } else {
            $weightEvaluation = "Congratulations on your weekly progress — you’ve gained " . abs($newWeight) . " lbs this week! This is still progress, and every step moves you closer to your fitness objectives.";
        }

        // Assume $nextFocus contains the focus for the upcoming week
        return $this->sendSms(
            $phoneNumber,
            "Hi {$firstName}, {$weightEvaluation} 💪 Great work completing this week of your GoPeakFit program! 🎉
                        A brand-new program starts next week to keep you moving forward. Keep pushing—you’re doing amazing! 🚀 – GoPeakFit Team"
        );
    }

    /**
     * Summary of updateConversation
     * Update the messages in db, for conversation logs
     * @param mixed $id
     * @param mixed $newConversation
     * @return bool
     */
    public function update($id, $newConversation)
    {
        return $this->messageRepository->update($id, $newConversation);
    }

    /**
     * Summary of sendDailyUpdateForTrialProgram
     * @param mixed $user
     * @param mixed $daysSinceAccountCreated
     * @param mixed $timeOfDay
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendDailyUpdateForTrialProgram($user, $daysSinceAccountCreated, $timeOfDay)
    {
        $todaysProgram = $this->trialProgramService->find($daysSinceAccountCreated);
        $todaysProgramWorkout = implode(",", $todaysProgram->workout);

        if ($timeOfDay == 'morning' || $timeOfDay == 'trial') {
            $smsToTrainee = "Hi $user->first_name, today is your Day $todaysProgram->day of GoPeakFit 5-Day Trial Program, today's focus is $todaysProgram->focus, Warm up by doing $todaysProgram->warm_up and after that here is your daily workout guide $todaysProgramWorkout , after doing your workout, dont forget to ooldown by doing $todaysProgram->cool_down, at the end of the day you will have a $todaysProgram->alignment. Stay on track and focus on your goal. We are here to help you achieve it.";
        } elseif ($timeOfDay == 'afternoon') {
            $smsToTrainee = "Hey $user->first_name, just an update, how your morning workout? did you able to finish it? or you have a blocker? Please let me know so i can assist you.";
        } else {
            $smsToTrainee = "Good evening $user->first_name, how are you? are you done with your Day $todaysProgram->day program? Today you are expected to have alignment on  $todaysProgram->alignment";
        }

        if ($timeOfDay != 'trial') {
            $this->messageRepository->appendBotMessageToConversation($user, $smsToTrainee);
        }

        return $this->sendSms($user->phone_number, $smsToTrainee);
    }

    /**
     * Summary of appendBotMessageToConversation,
     * Add newly conversation to db, the ai response will be basing on it.
     * @param mixed $user
     * @param mixed $botMessage
     * @return bool
     */
    public function appendBotMessageToConversation($user, $botMessage): bool
    {
        return $this->messageRepository->appendBotMessageToConversation($user, $botMessage);
    }

    /**
     * Summary of sendExpirationMessageToTrial
     * Return message when the trial program is ended (5 or 30 days)
     * @param mixed $phoneNumber
     * @param mixed $firstName
     * @param mixed $isPromo
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendExpirationMessageToTrial($phoneNumber, $firstName, $isPromo, $currentWeight, $userId)
    {
        $newWeight = $this->traineeProgressService->getNewWeight($userId, $currentWeight);

        // Evaluation greetings if the user lose weight lbs
        $newWeight > 0
            ? $weightEvaluation = "Congratulations on your progress — you’ve lost $newWeight lbs during the 5-Day Trial Program. This is a strong beginning toward reaching your long-term goals."
            : $weightEvaluation  = "Congratulations on your progress — you’ve gained " . abs($newWeight) . " lbs during the 5-Day Trial Program. This is a positive step toward achieving your fitness objectives.";

        if ($isPromo != 1) {
            return $this->sendSms($phoneNumber, "Hi $firstName, $weightEvaluation and you've completed your 5-day GoPeakFit trial! 🎉 To keep your progress going, upgrade your plan now to premium by visiting your dashboard account or by clicking here https://gopeakfit.com/login. Your subscription has started at $49/month. This gives you full access to our workout & diet plans. You can cancel anytime. Thanks for training with us! – GoPeakFit Team");
        } else {
            return  $this->sendSms($phoneNumber, "Hi $firstName, $weightEvaluation your 30-day GoPeakFit program has officially ended! 💪 Thanks for being part of the journey—we hope it helped you move closer to your fitness and health goals. This may be the end of the challenge, but it's just the beginning of your progress. Keep pushing forward! To keep your progress going, upgrade your plan now to premium by visiting your dashboard account or by clicking here https://gopeakfit.com/login. Your subscription has started at $49/month. This gives you full access to our workout & diet plans. You can cancel anytime. Thanks for training with us! – GoPeakFit Team");
        }
    }

    /**
     * Welcome message based on the subscription type
     * @param mixed $amount
     * @return string
     */
    public function getWelcomeMessageOnSubscription($amount)
    {
        return $amount == 1
            ? "Welcome to GoPeakFit, ! 🙌 Your 5-Day Trial starts today and we’re excited to guide you every step of the way. Over the next 5 days, you’ll receive personalized workouts, meal tips, and motivation to help you kickstart your journey. Stay consistent—we’ll crush your goals together. You’ve got this! 💪 – GoPeakFit Team"
            : "Welcome to GoPeakFit! 🙌 Your $49/month subscription is now active. You’ve unlocked full access to personalized workout programs, custom meal plans, and progress tracking tools designed to help you reach your goals faster. 🚀

                Stay consistent and check your dashboard for weekly updates, tips, and new challenges tailored to your fitness journey. 💪 Remember, you’re in control—cancel or pause anytime. Thanks for choosing GoPeakFit. Let’s crush your goals together! – GoPeakFit Team";
    }

    /**
     * 3x per day daily sms update  to trainee
     * @return void
     */
    public function sendWorkoutEncouragement()
    {
        $timeOfDay = $this->helpers->getTimeOfTheDay();
        $users = $this->userService->getAllUsersGoalsAndBiometric();

        foreach ($users as $user) {
            $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($user->created_at);
            $trialDay = $this->helpers->getTrialDay($user->is_promo);
            $askLatestWeight = $this->helpers->getLatestWeightQuestion($trialDay);

            if ($this->helpers->timeToUpdateCurrentWeight($daysSinceAccountCreated, $timeOfDay, $user)) {
                $this->sendSms(
                    $user->phone_number,
                    $askLatestWeight
                );
            } elseif ($daysSinceAccountCreated < 5) { // Executes if trainee is still in 5-Day Trial
                $message = $this->dailyMessageUpdates(
                    $user->user_id,
                    $user->subscription,
                    $daysSinceAccountCreated,
                    $user->first_name,
                    $user->phone_number,
                    $user->current_weight
                );

                $this->appendBotMessageToConversation($user, $message);
                $this->sendSms($user->phone_number, $message);
            } elseif ($this->helpers->isTrialExpire($daysSinceAccountCreated, $user)) {
                $this->sendExpirationMessageToTrial(
                    $user->phone_number,
                    $user->first_name,
                    0,
                    $user->current_weight,
                    $user->user_id,
                );
            } else { // Executes if the trainee is paid to premium and subscribed to our program
                if ($this->helpers->isPremiumOrPromo($user, $daysSinceAccountCreated)) {
                    $message = $this->dailyMessageUpdates(
                        $user->user_id,
                        $user->subscription,
                        $daysSinceAccountCreated,
                        $user->first_name,
                        $user->phone_number,
                        $user->current_weight
                    );

                    // Guard if no message generated
                    if ($message === 'Happy Workout') {
                        continue;
                    }

                    $this->appendBotMessageToConversation($user, $message);
                    $this->sendSms($user->phone_number, $message);
                }
            }
        }
    }
}
