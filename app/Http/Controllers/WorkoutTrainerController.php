<?php

namespace App\Http\Controllers;

use App\Repositories\MessageRepository;
use App\Repositories\UserRepository;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;

class WorkoutTrainerController extends Controller
{

    protected $helpers;
    protected $message;
    protected $user;

    /**
     * Summary of __construct
     * @param \App\Support\HelperFunctions $helpers
     * @param \App\Repositories\MessageRepository $message
     * @param \App\Repositories\UserRepository $user
     */
    public function __construct(HelperFunctions $helpers, MessageRepository $message, UserRepository $user)
    {
        $this->helpers = $helpers;
        $this->message = $message;
        $this->user = $user;
    }


    // Method to get response from OpenAI
    public function getOpenAIResponse($userMessage, $userData = null)
    {
        $response = $this->message->getAiResponse($userData, $userMessage);
        $data = json_decode($response->getBody()->getContents(), true);

        return $data['choices'][0]['message']['content'] ?? 'Sorry, I did not get that.';
    }


    // Method to handle incoming SMS from User
    public function handleIncomingSms(Request $request)
    {
        // Get the data from trainee reply in SMS via phone
        $userMessage = $request->input('Body');
        $userPhone = $request->input('From');

        // Get user based on phone number
        $userData = $this->user->getUserDataByPhoneNumber($userPhone);

        // Save the latest weight of the trainee in 5-day trial when its about to end
        $timeOfTheDay = $this->helpers->getTimeOfTheDay();
        $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($userData);
        $dayBeforeTrialExpire = $this->helpers->getDayBeforeTrialExpired($userData->is_promo);

        // Save new weight progress day before it ended
        if ($timeOfTheDay == 'evening' && $daysSinceAccountCreated == $dayBeforeTrialExpire && $this->helpers->replyIsNewWeight($userMessage)) {
            $this->helpers->saveNewWeight($userData->user_id, $userMessage);
        }

        // Here we prepare the data for prompts
        $systemPropmt = $this->helpers->generatePrompt($userData);

        // Continue conversation
        $botResponse = $this->getOpenAIResponse($userMessage, $systemPropmt);
        $newConversation = "$userData->conversations |$userData->first_name : $userMessage |GPF : $botResponse";

        // Update conversation
        $this->message->update($userData->user_id, $newConversation);

        $twiml = $this->helpers->createTwilioReply($botResponse);

        return response($twiml, 200)
            ->header('Content-Type', 'application/xml');
    }

    /**
     * Summary of sendWorkoutEncouragement
     * Daily messages update to our Trainees (3x per day)
     * Here we dont use the AI, it compose of static greetings
     * that define in message bank to handle daily updated to trainees
     * @return void
     */
    public function sendWorkoutEncouragement(): void
    {
        $timeOfDay = $this->helpers->getTimeOfTheDay();
        $users = $this->user->getAllUsersGoalsAndBiometric();

        foreach ($users as $user) {
            $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($user);
            $trialDay = $this->helpers->getTrialDay($user->is_promo);

            $askLatestWeight = $this->helpers->getLatestWeightQuestion($trialDay);

            if ($daysSinceAccountCreated == 4 && $timeOfDay == 'evening' && $user->is_promo == 0) { // Track latest weight to know the progress
                $this->message->sendSms(
                    $user->phone_number,
                    $askLatestWeight
                );
            } elseif ($daysSinceAccountCreated == 29 && $timeOfDay == 'evening' && $user->is_promo == 1) { // Track latest weight to know the progress
                $this->message->sendSms(
                    $user->phone_number,
                    $askLatestWeight
                );
            } elseif ($daysSinceAccountCreated < 5) { // Executes if trainee is still in 5-Day Trial
                $this->message->sendDailyUpdateForTrialProgram(
                    $user,
                    $daysSinceAccountCreated,
                    $timeOfDay
                );
            } elseif ($daysSinceAccountCreated == 5 && $user->is_promo == 0 && $user->subscription == 'trial') { //Executes if 5-Day trial expired
                $this->message->sendExpirationMessageToTrial(
                    $user->phone_number,
                    $user->first_name,
                    0,
                    $user->current_weight,
                    $user->user_id,
                );
            } elseif ($daysSinceAccountCreated == 30 && $user->is_promo == 1) { // Executes if trainee is in promo account expired
                $this->message->sendExpirationMessageToTrial(
                    $user->phone_number,
                    $user->first_name,
                    1,
                    $user->current_weight,
                    $user->user_id,
                );
            } else { // Executes if the trainee is paid to premium and subscribed to our program
                if (($user->subscription != 'trial' && $user->payment_status == 'paid') || ($user->is_promo == 1 && $daysSinceAccountCreated < 30)) {
                    $messages = $this->message->dailyMessageUpdates();

                    // Generate message udpate to trainee about the daily progress
                    $botMessage = $this->message->getBotMessage($user, $messages, $timeOfDay);

                    // Add latest converstation to message log
                    $this->message->appendBotMessageToConversation($user, $botMessage);

                    // Send daily updates (3x per day)
                    $this->message->sendSms($user->phone_number, $botMessage);
                }

                return;
            }
        }
    }
}
