<?php

namespace App\Http\Controllers;

use App\Http\Requests\BiometricRequest;
use App\Models\GpfPhoneVerification;
use App\Repositories\BiometricRepository;
use App\Repositories\MessageRepository;
use App\Repositories\PhoneVerificationRepository;
use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class  BiometricController extends Controller
{
    protected $biometric;
    protected $message;
    protected $phoneVerification;
    protected $helpers;

    /**
     * Summary of __construct
     * @param \App\Repositories\BiometricRepository $biometric
     * @param \App\Repositories\MessageRepository $message
     * @param \App\Repositories\PhoneVerificationRepository $phoneVerification
     * @param \App\Support\HelperFunctions $helpers
     */
    public function __construct(BiometricRepository $biometric, MessageRepository $message, PhoneVerificationRepository $phoneVerification, HelperFunctions $helpers)
    {
        $this->biometric = $biometric;
        $this->message = $message;
        $this->phoneVerification = $phoneVerification;
        $this->helpers = $helpers;
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

        $biometric = $this->biometric->create($request);

        $this->message->create($request->user_id, $phone);

        $this->phoneVerification->create($request->user_id, $otp);

        $this->helpers->sendOtp($phone, $otp);

        return response()->json([
            'message' => 'Biometrics saved successfully!',
            'biometric' => $biometric
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
        $user = $this->phoneVerification->show($userId);

        try {
            if ($otp !== $user->otp) {
                return response()->json([
                    'message' => 'Invalid OTP provided. Please try again.',
                ], 400);
            }

            // Verified number
            $this->phoneVerification->update($userId);

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
