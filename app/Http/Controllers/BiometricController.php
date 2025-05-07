<?php

namespace App\Http\Controllers;

use App\Http\Requests\BiometricRequest;
use App\Models\GpfBiometric;
use App\Models\GpfMessage;
use App\Models\GpfPhoneVerification;

class BiometricController extends Controller
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

        return response()->json([
            'message' => 'Biometrics saved successfully!',
            'biometric' => $biometric
        ]);
    }

    // Generate 6-digits OTP
    private function generateOTP(): string {
        return str_pad(strval(random_int(0, 999999)), 6, '0', STR_PAD_LEFT);
    }
}
