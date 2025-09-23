<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Services\AiService;
use App\Services\MessageService;
use App\Services\TwilioService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;

class WorkoutTrainerController extends Controller
{

    protected $helpers;
    protected $messageService;
    protected $aiService;
    protected $twilioService;
    protected $userService;

    /**
     * Summary of __construct
     * @param \App\Support\HelperFunctions $helpers
     * @param \App\Services\MessageService $messageService
     */
    public function __construct(
        HelperFunctions $helpers,
        MessageService $messageService,
        UserService $userService,
        AiService $aiService,
        TwilioService $twilioService,
    ) {
        $this->helpers = $helpers;
        $this->messageService = $messageService;
        $this->userService = $userService;
        $this->aiService = $aiService;
        $this->twilioService = $twilioService;
    }

    // Method to handle incoming SMS from User
    public function handleIncomingSms(Request $request)
    {
        // Get the data from trainee reply in SMS via phone
        $userMessage = $request->input('Body');
        $userPhone = $request->input('From');

        // Get user based on phone number
        $userData = $this->userService->getUserDataByPhoneNumber($userPhone);

        // Save the latest weight of the trainee in 5-day trial when its about to end
        $timeOfTheDay = $this->helpers->getTimeOfTheDay();
        $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($userData);
        $dayBeforeTrialExpire = $this->helpers->getDayBeforeTrialExpired($userData->is_promo);

        // Save new weight progress day before it ended
        if (
            $timeOfTheDay == 'evening'
            && ($daysSinceAccountCreated == $dayBeforeTrialExpire || $userData->subscription === 'premium')
            && $this->helpers->replyIsNewWeight($userMessage)
        ) {
            $this->helpers->saveNewWeight($userData->user_id, $userMessage);
        }

        // Here we prepare the data for prompts
        $systemPropmt = $this->helpers->generatePrompt($userData);

        // Continue conversation
        $botResponse = $this->aiService->getOpenAIResponse($userMessage, $systemPropmt);
        $this->messageService->appendBotMessageToConversation($userData, $botResponse);

        $twiml = $this->twilioService->createTwilioReply($botResponse);

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
        $users = $this->userService->getAllUsersGoalsAndBiometric();

        foreach ($users as $user) {
            $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($user);
            $trialDay = $this->helpers->getTrialDay($user->is_promo);
            $askLatestWeight = $this->helpers->getLatestWeightQuestion($trialDay);

            if ($this->timeToUpdateCurrentWeight($daysSinceAccountCreated, $timeOfDay, $user)) {
                $this->messageService->sendSms(
                    $user->phone_number,
                    $askLatestWeight
                );
            } elseif ($daysSinceAccountCreated < 5) { // Executes if trainee is still in 5-Day Trial
                $message = $this->messageService->dailyMessageUpdates(
                    $user->user_id,
                    $user->subscription,
                    $daysSinceAccountCreated,
                    $user->first_name,
                    $user->phone_number,
                    $user->current_weight
                );

                $this->messageService->appendBotMessageToConversation($user, $message);
                $this->messageService->sendSms($user->phone_number, $message);
            } elseif ($this->isTrialExpire($daysSinceAccountCreated, $user)) {
                $this->messageService->sendExpirationMessageToTrial(
                    $user->phone_number,
                    $user->first_name,
                    0,
                    $user->current_weight,
                    $user->user_id,
                );
            } else { // Executes if the trainee is paid to premium and subscribed to our program
                if ($this->isPremiumOrPromo($user, $daysSinceAccountCreated)) {
                    $message = $this->messageService->dailyMessageUpdates(
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

                    $this->messageService->appendBotMessageToConversation($user, $message);
                    $this->messageService->sendSms($user->phone_number, $message);
                }
            }
        }
    }

    /**
     * Summary of timeToUpdateCurrentWeight
     * @param mixed $daysSinceAccountCreated
     * @param mixed $timeOfDay
     * @param mixed $user
     * @return bool
     */
    private function timeToUpdateCurrentWeight($daysSinceAccountCreated, $timeOfDay, $user): bool
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
    private function isTrialExpire($daysSinceAccountCreated, $user): bool
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
    private function isPremiumOrPromo($user, $daysSinceAccountCreated)
    {
        return ($user->subscription != 'trial' && $user->payment_status == 'paid') || ($user->is_promo == 1 && $daysSinceAccountCreated < 30);
    }
}
