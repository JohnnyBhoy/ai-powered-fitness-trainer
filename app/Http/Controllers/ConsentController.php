<?php

namespace App\Http\Controllers;

use App\Models\Consent;
use App\Models\GpfBiometric;
use App\Models\GpfPhoneVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ConsentController extends Controller
{
    public function store(Request $request)
    {
        // Get the phone number from the request
        $phone = $request->input('phone');

        // Preprocess the phone number to ensure it starts with +1
        if (strpos($phone, '+1') !== 0) {
            $phone = '+1' . $phone; // Prepend +1 if missing
        }

        // Merge the normalized phone number back into the request
        $request->merge(['phone' => $phone]);

        // Validate the normalized phone number
        $validator = Validator::make($request->all(), [
            'phone' => 'required|regex:/^\+1\d{10}$/', // Ensures +1XXXXXXXXXX format
            'consent' => 'required|boolean|in:1,true',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Invalid data provided.',
                'messages' => $validator->errors(),
            ], 422);
        }

        // Insert data
        Consent::insert([
            'phone_number' => $request->phone,
            'consent_status' => 'granted',
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
            'consent_text' => 'I agree to receive text messages from GoPeakFit with updates, promotions, and notifications. Message and data rates may apply. Reply STOP to unsubscribe at any time.',
            'created_at' => now(),
        ]);

        return response()->json(['message' => 'Consent saved successfully.']);
    }
}
