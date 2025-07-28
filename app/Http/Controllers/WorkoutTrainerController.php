<?php

namespace App\Http\Controllers;

use App\Models\GpfMessage;
use App\Models\GpfSubscription;
use DateTime;
use Illuminate\Http\Request;
use Twilio\Rest\Client;
use GuzzleHttp\Client as GuzzleClient;
use Illuminate\Support\Facades\DB;

class WorkoutTrainerController extends Controller
{
    // Method to send SMS via Twilio
    public function sendSms($to, $message)
    {
        $sid = env('TWILIO_SID');
        $token = env('TWILIO_AUTH_TOKEN');
        $twilioPhoneNumber = env('TWILIO_PHONE_NUMBER');

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

    // Method to get response from OpenAI
    public function getOpenAIResponse($userMessage, $userData = null)
    {
        $apiKey = env('OPENAI_API_KEY');
        $client = new GuzzleClient();

        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'system', 'content' => $userData],
                    ['role' => 'user', 'content' => $userMessage],
                ],
                'max_tokens' => 150,
            ]
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        return $data['choices'][0]['message']['content'] ?? 'Sorry, I did not get that.';
    }


    // Method to handle incoming SMS from User
    public function handleIncomingSms(Request $request)
    {
        $userMessage = $request->input('Body');
        $userPhone = $request->input('From');

        // Get user based on phone number
        $userData = DB::table('users as u')
            ->leftJoin('gpf_messages as gm', 'u.id', '=', 'gm.user_id')
            ->leftJoin('gpf_biometrics as b', 'u.id', '=', 'b.user_id')
            ->leftJoin('gpf_goals as g', 'u.id', '=', 'g.user_id')
            ->where('gm.phone_number', $userPhone)
            ->first();

        // Here we prepare the data
        $systemPropmt = $this->generatePrompt($userData);

        // Continue conversation
        $botResponse = $this->getOpenAIResponse($userMessage, $systemPropmt);
        $newConversation = $userData->conversations . " |$userData->first_name : $userMessage |GPF : $botResponse";

        // Update conversation
        GpfMessage::where('user_id', $userData->id)
            ->update([
                'conversations' => $newConversation,
            ]);

        $twiml = '<?xml version="1.0" encoding="UTF-8"?>
                    <Response>
                        <Message>' . htmlspecialchars($botResponse) . '</Message>
                    </Response>';

        return response($twiml, 200)
            ->header('Content-Type', 'application/xml');
    }

    // Method to send workout encouragement messages
    public function sendWorkoutEncouragement()
    {
        // Set the timezone to Colorado (America/Denver)
        date_default_timezone_set('America/Denver');
        $today = new DateTime();
        $hour = (int) $today->format('G'); // 0 - 23

        // Define time segments
        if ($hour >= 5 && $hour < 12) {
            $timeOfDay = 'morning';
        } elseif ($hour >= 12 && $hour < 17) {
            $timeOfDay = 'afternoon';
        } else {
            $timeOfDay = 'evening';
        }

        $users = DB::table('users as u')
            ->leftJoin('gpf_messages as gm', 'u.id', '=', 'gm.user_id')
            ->leftJoin('gpf_biometrics as b', 'u.id', '=', 'b.user_id')
            ->leftJoin('gpf_goals as g', 'u.id', '=', 'g.user_id')
            ->get();

        // Send messages to users
        foreach ($users as $user) {
            $createdDate = new DateTime($user->created_at);
            $interval = $today->diff($createdDate);
            $daysDifference = $interval->days;

            // We check if the free trial is already in 5 days since user signup
            if ($daysDifference == 5 && $user->is_promo == 0) {
                $this->sendSms($user->phone_number, 'You already reached your 5-days GPF Trail Plan, we are now charging you $49 usd monthly to continue our workout and diet plan. you can stop or unsubscribe anytime you want. Thank you.');
                return;
            }
            if ($daysDifference == 30 && $user->is_promo == 1) {
                $this->sendSms($user->phone_number, 'You already reached your 30-days GPF Trail Plan, Thank you for trying our GOPEAKFIT Program.');
                return;
            } else {
                // Update first the days left in free trial
                $trialDays = $user->is_promo ? 30 : 5;

                if ($daysDifference <= $trialDays) {
                    GpfSubscription::where('user_id', $user->user_id)
                        ->update(['days_left' => $trialDays - $daysDifference]);
                }

                // Define message bank
                $messages = [
                    'morning' => [
                        "Morning check-in: How did you sleep? Energy 1-10? Hydrate now, then attack the day.",
                        "You said you had goals—prove it today. What’s your first move?",
                        "New day. No excuses. What’s one win you’ll lock in before noon?",
                        "Wake up with purpose. What’s your mindset this morning? Locked in or lazy?",
                        "Start now: What’s your top priority today? Say it out loud. Own it.",
                        "What’s one habit you’re building today? Don’t skip. Don’t slide.",
                        "Are you feeling strong or making excuses? Decide now.",
                        "It’s grind time. Stretch, hydrate, commit. What’s the plan?",
                        "You got 24 hours. What’s your non-negotiable win today?"
                    ],
                    'afternoon' => [
                        "Midday pulse check: Are you staying focused or drifting? Adjust now.",
                        "You’re halfway through—what have you actually accomplished so far?",
                        "Don’t coast through the day. What’s one thing you’re avoiding right now?",
                        "This is where most people slow down. Push harder. What’s left to crush?",
                        "Rate your effort so far 1-10. If it’s under 8, fix it.",
                        "You said you wanted change. Prove it in your next action.",
                        "Refocus time: What’s something small but meaningful you can finish today?",
                        "Hydrate. Breathe. Now get back in control—what are you finishing before 5PM?",
                        "Are you on track with your meals, training, mindset? Adjust now if needed."
                    ],
                    'evening' => [
                        "Day’s almost done. Did you keep your word today?",
                        "What’s one thing you crushed today? And one thing you need to improve tomorrow?",
                        "Look back: Were your actions aligned with your goals?",
                        "No fluff—did you train, eat right, and stay focused today? Be honest.",
                        "End strong: What’s one thing you learned about yourself today?",
                        "You either built momentum or made excuses. Which one was it?",
                        "Progress isn’t just effort—it’s consistency. Did you show up today?",
                        "Before sleep: What will tomorrow’s top priority be?",
                        "Win or waste? Label today. Then plan to do better (or repeat) tomorrow."
                    ],
                ];

                // Randomize the message
                $user->conversations == null
                    ? $botMessage = "Introduce yourself to $user->first_name as 'GPF', his expert workout and diet coach  with a firm, commanding tone and give clear, no-excuse advice or a starter plan they must follow.  Avoid soft language—be direct, results-driven, and uncompromising. No hashtags or filler. note that keep it short and pricise reply like in sms bot, make it only 150 characters long"
                    : $botMessage = $messages[$timeOfDay][array_rand($messages[$timeOfDay])];



                // Append the message to conversations
                GpfMessage::where('user_id', operator: $user->user_id)
                    ->update(['conversations' => "$user->conversations ,GPF: $botMessage"]);

                // Send message via Twilio
                $this->sendSms($user->phone_number, $botMessage);
            }
        }
    }

    // Generate dynamic prompts
    private function generatePrompt($user): string
    {
        $strictnessLevel = $this->getStrictnessLevel($user->strictness_level);

        return  trim("You are an strict expert Expert fitness and nutrition coach. Your job is to help the user reach their health goals through personalized workout and diet advice. Be practical, empathetic, and realistic in your suggestions.

            User Profile:
            
            - Age: $user->age years
            - Sex: $user->sex
            - Current Weight: $user->current_weight lbs
            - Goal Weight: $user->goal_weight lbs
            - Fitness Level: $user->fitness_level (e.g., beginner, intermediate, advanced)
            - Equipment Access: $user->equipment_access (e.g., gym, dumbbells at home, bodyweight only)
            - Food Allergies: $user->food_allergies (e.g., nuts, gluten, lactose; write 'None' if not provided)
            - Primary Goal: $user->goal (e.g., fat loss, muscle gain, endurance)
            - Motivation ('Why'): $user->why (user’s reason for wanting to change)
            - Past Obstacles: $user->past_obstacles (things that stopped the user before)
            - Current Struggles: $user->current_struggles (what's hard for the user right now)
            
            Instructions:
            1. Use the profile to tailor both workout and nutrition advice.
            2. Be supportive and encouraging while staying realistic.
            3. Suggest plans that fit the user’s fitness level and available equipment.
            4. Avoid foods that trigger allergies.
            5. Offer ideas for overcoming their struggles and past roadblocks.
            6. Emphasize consistency and sustainability over intensity.
            7. Respond in a tone like a real personal coach, not a robot.
            8. Reply in short, precise and complete thought and not more then 300 characters unless needed.
            
            Never recommend dangerous practices. Always check if a suggestion is safe given the user’s profile. Reply only short and precise response but
            make it longer if necessary, like a text messages, remember that $user->first_name wants his workout training to be $strictnessLevel");
    }

    private function getStrictnessLevel($level)
    {
        if ($level == 1) {
            return 'Chill: General meal guidelines (no tracking)';
        }

        if ($level == 2) {
            return 'Balanced: Macro targets with suggested portions';
        }

        if ($level == 3) {
            return 'Strict: Precise calorie/macro tracking with specific food weights';
        }
    }
}
