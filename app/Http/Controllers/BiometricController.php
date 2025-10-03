<?php

namespace App\Http\Controllers;

use App\Http\Requests\BiometricRequest;
use App\Services\BiometricService;
use App\Services\MessageService;
use App\Services\PhoneVerificationService;
use App\Services\TwilioService;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class  BiometricController extends Controller
{
    protected $biometric;
    protected $message;
    protected $helpers;
    protected $biometricService;
    protected $messageService;
    protected $phoneVerificationService;
    protected $twilioService;


    public function __construct(
        HelperFunctions $helpers,
        BiometricService $biometricService,
        MessageService $messageService,
        PhoneVerificationService $phoneVerificationService,
        TwilioService $twilioService,
    ) {
        $this->helpers = $helpers;
        $this->biometricService = $biometricService;
        $this->messageService = $messageService;
        $this->phoneVerificationService = $phoneVerificationService;
        $this->twilioService = $twilioService;
    }

    /**
     * Summary of store
     * @param \App\Http\Requests\BiometricRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(BiometricRequest $request)
    {
        $otp = $this->helpers->generateOTP();
        $phone = $request->phone_number;

        $phone = $this->helpers->prependPlusOneIfNumberHasNo($phone);

        $biometric = $this->biometricService->create([
            ...$request->validated(),
        ]);

        $this->messageService->create([
            'user_id' => $request->user_id,
            'phone_number' => $phone
        ]);

        // Create verification for phone number (send 6-digit OTP)
        $this->phoneVerificationService->create([
            'user_id' => $request->user_id,
            'otp' => $otp,
            'is_verified' => 0
        ]);

        //$this->twilioService->sendOtp($phone, $otp);

        return response()->json([
            'message' => 'Location and Biometrics saved successfully!',
            'biometric' => $biometric,
        ]);
    }

    /**
     * Summary of verifyPhoneNumber
     * @param mixed $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyPhoneNumber(Request $request)
    {
        $otp = $request->input('otp');
        $userId = $request->input('user_id');

        // Validate the form data
        $request->validate([
            'user_id' => 'required', // Ensure the email is entered
            'otp' => 'required|max:6|min:6',  // Ensures the consent checkbox is checked
        ]);


        // Get the token based on email
        $user = $this->phoneVerificationService->show($userId);

        try {
            if ($otp !== $user->otp) {
                return response()->json([
                    'message' => 'Invalid OTP provided. Please try again.',
                ], 400);
            }

            // Verified number
            $this->phoneVerificationService->update($userId);

            // Success response
            return response()->json([
                'message' => 'Phone number verified successfully.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Phone verification error', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'Something went wrong during verification.',
            ], 500);
        }
    }
}
