<?php

namespace App\Services;

use App\Support\HelperFunctions;

class TwilioService
{
    protected $helper;
    protected $biometricService;
    protected $phoneVerificationService;

    /**
     * Summary of __construct
     * @param \App\Support\HelperFunctions $helper
     * @param \App\Services\BiometricService $biometricService
     * @param \App\Services\PhoneVerificationService $phoneVerificationService
     */
    public function __construct(
        HelperFunctions $helper,
        BiometricService $biometricService,
        PhoneVerificationService $phoneVerificationService
    ) {
        $this->helper = $helper;
        $this->biometricService = $biometricService;
        $this->phoneVerificationService = $phoneVerificationService;
    }

    /**
     * Summary of createTwilioReply
     * @param mixed $botResponse
     * @return string
     */
    public function createTwilioReply($botResponse): string
    {
        return '<?xml version="1.0" encoding="UTF-8"?>
                    <Response>
                        <Message>' . htmlspecialchars($botResponse) . '</Message>
                    </Response>';
    }

    /**
     * Summary of sendOtp
     * @param mixed $phoneNumber
     * @param mixed $confirmationToken
     * @return void
     */
    public function sendOtp($phoneNumber, $confirmationToken)
    {
        // Use Twilio's API to send a confirmation SMS
        $sid = env('TWILIO_SID');
        $authToken = env('TWILIO_AUTH_TOKEN');
        $twilio = new \Twilio\Rest\Client($sid, $authToken);

        $twilio->messages->create(
            $phoneNumber,
            [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Thank you for opting in to receive workout messages, here is your confirmation code : $confirmationToken",
            ]
        );
    }


    /**
     * Summary of resendOtp
     * @param mixed $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resendOtp($request)
    {
        $newOtp = $this->helper->generateOTP();
        $userId = $request->input('user_id');

        // Validate the form data
        $request->validate([
            'user_id' => 'required', // Ensure the user id is entered
        ]);

        // Get phone number based in user id
        $phoneNumber = $this->biometricService->getPhoneNumberById($userId);

        // Update new confirm token
        $user = $this->phoneVerificationService->updateOtp($userId, $newOtp);

        // Optionally, send a confirmation message to the user's phone number using Twilio
        $this->sendOtp($phoneNumber, $newOtp);

        // Compare
        if ($user) {
            // Redirect the user to a thank you or confirmation page
            return response()->json(['message' => 'You have successfully resend new OTP, please check your inbox.'], 200);
        }

        // Redirect the user to a thank you or confirmation page
        return response()->json(['message' => 'Failed sending verification OTP, try again later.'], 500);
    }
}
