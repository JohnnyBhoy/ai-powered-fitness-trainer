<?php

namespace App\Http\Controllers;

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
        $daysSinceAccountCreated = $this->helpers->getDaysSinceAccountCreated($userData->created_at);
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
        $botResponse = $this->aiService->get($userMessage, $systemPropmt);

        // Add ai response to conversations
        $this->messageService->appendBotMessageToConversation($userData, $botResponse);

        // Create twilio reply
        $twiml = $this->twilioService->createTwilioReply($botResponse);

        return response($twiml, 200)
            ->header('Content-Type', 'application/xml');
    }
}
