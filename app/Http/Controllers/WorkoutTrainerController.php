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

        $twilio = new Client($sid, password: $token);
        $twilio->messages->create(
            $to,
            [
                'from' => $twilioPhoneNumber,
                'body' => $message,
            ]
        );
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
            ->where('b.phone_number', $userPhone)
            ->first();

        // Here we prepare the data
        $systemPropmt = $this->generatePrompt($userData);

        // Setup user message
        $userMessage = "$userData->conversations, $userData->first_name : $userMessage";

        // Continue conversation
        $botResponse = $this->getOpenAIResponse($userMessage, $systemPropmt);
        $newConversation = $userData->conversations . " | GPF: $userMessage | $userData->first_name : $botResponse";

        // Update conversation
        GpfMessage::where('user_id', $userData->id)
            ->update([
                'conversations' => $newConversation,
            ]);

        // Send SMS
        $this->sendSms($userPhone, $botResponse);

        return response()->xml('<Response></Response>');
    }

    // Method to send workout encouragement messages
    public function sendWorkoutEncouragement()
    {
        // Set the timezone to Colorado (America/Denver)
        date_default_timezone_set('America/Denver');
        $today = new DateTime();

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
            if ($daysDifference == 5) {
                $this->sendSms($user->phone_number, 'You already reached your 5-days GPF Trail Plan, we are now charging you $49 usd monthly to continue our workout and diet plan. you can stop or unsubscribe anytime you want. Thank you.');
                return;
            } else {
                // Update first the days left in free trial
                GpfSubscription::where('user_id', $user->user_id)
                ->update(['days_left' => 5 - $daysDifference]);

                // Here we prepare the data
                $systemPropmt = $this->generatePrompt($user);

                $userMessage = $this->generateMessage($user, $systemPropmt);

                // Trainer Bot message
                $botMessages =  $this->getOpenAIResponse($userMessage, $systemPropmt);

                // Append the message to conversations
                GpfMessage::where('user_id', operator: $user->user_id)
                    ->update(['conversations' => "$user->conversations ,GPF: $botMessages"]);

                // Send message via Twilio
                $this->sendSms($user->phone_number, $botMessages);
            }
        }
    }

    // Generate dynamic prompts
    private function generatePrompt($user)
    {
        return  "You are an strict expert Expert fitness and nutrition coach. Your job is to help the user reach their health goals through personalized workout and diet advice. Be practical, empathetic, and realistic in your suggestions.

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
            
            Never recommend dangerous practices. Always check if a suggestion is safe given the user’s profile.";
    }

    // generate dyanmic user message to ai
    private function generateMessage($user, $systemPropmt)
    {
        $userName = "$user->first_name $user->last_name";
        $userMessage = "";

        if (is_null($user->conversations)) {
            $userMessage = "You are GPF, a strict and disciplined expert in fitness and nutrition. Your job is to push {$userName} to take serious, immediate action toward health and strength. Analyze this profile: {$systemPropmt}. Introduce yourself with a firm, commanding tone and give clear, no-excuse advice or a starter plan they must follow. Your message must be under 150 characters. Avoid soft language—be direct, results-driven, and uncompromising. No hashtags or filler. note that keep it short and pricise reply like in sms bot, make it only 150 characters long";
        } else {
            $userMessage = "This is the whole conversation [$user->conversations], create a response to trainee's last message based on the conversations, be strict and act like a expert coach, avoid repeatitive greetings and be strict to the point. note that keep it short, specific and precise reply like in sms bot, also remove the motivational message at the end, stick to the reply or ai response, make it only 150 characters long";
        }

        return $userMessage;
    }
}
