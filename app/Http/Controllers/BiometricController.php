<?php

namespace App\Http\Controllers;

use App\Http\Requests\BiometricRequest;
use App\Models\GpfBiometric;
use App\Models\GpfMessage;
use App\Models\GpfPhoneVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class  BiometricController extends Controller
{
    public function store(BiometricRequest $request)
    {
        $otp = $this->generateOTP();

        // Prepare the data we insert to phone verification table
        $phoneVerificationData = [
            'user_id' => $request->user_id,
            'otp' => $otp,
            'is_verified' => 0,
        ];

        // Populate biometrics data
        $biometric = GpfBiometric::create([
            ...$request->validated(),
        ]);

        // Populate Messages
        GpfMessage::create([
            'user_id' => $request->user_id,
            'phone_number' => $request->phone_number,
        ]);

        // Populate user phone number verificationd data
        GpfPhoneVerification::create($phoneVerificationData);

        // Optionally, send a confirmation message to the user's phone number using Twilio
        $this->sendOtp($request->phone_number, $otp);

        return response()->json([
            'message' => 'Biometrics saved successfully!',
            'biometric' => $biometric
        ]);
    }

    // Generate 6-digits OTP
    private function generateOTP(): string
    {
        return str_pad(strval(random_int(0, 999999)), 6, '0', STR_PAD_LEFT);
    }

    // Send a confirmation SMS using Twilio (optional)
    private function sendOtp($phoneNumber, $confirmationToken)
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

    // Handle the form submission for phone number verification
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
        $user = GpfPhoneVerification::where('user_id', $userId)->first();

        try {
            if ($otp !== $user->otp) {
                return response()->json([
                    'message' => 'Invalid OTP provided. Please try again.',
                ], 400);
            }
    
            // Verified number
            GpfPhoneVerification::where('user_id', $userId)->update(['is_verified' => 1]);

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

    // here we send new OTP to the user
    public function resendOtp(Request $request)
    {
        $newOtp = $this->generateOTP();
        $userId = $request->input('user_id');

        // Validate the form data
        $request->validate([
            'user_id' => 'required', // Ensure the user id is entered
        ]);

        // Get phone number based in user id
        $phoneNumber = GpfBiometric::where('user_id', $userId)->value('phone_number');

        // Update new confirm token
        $user = GpfPhoneVerification::where('user_id', $userId)->update(['otp' => $newOtp]);

        // Optionally, send a confirmation message to the user's phone number using Twilio
        $this->sendOtp($phoneNumber, $newOtp);

        // Compare
        if ($user) {
            // Redirect the user to a thank you or confirmation page
            return response()->json(['message' => 'You have successfully resend new OTP, please check your inbox.']);
        }

        // Redirect the user to a thank you or confirmation page
        return response()->json(['message' => 'Failed sending verification OTP, try again later.']);
    }
}
