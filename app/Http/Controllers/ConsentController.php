<?php

namespace App\Http\Controllers;

use App\Support\HelperFunctions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsentController extends Controller
{
    protected $helpers;

    /**
     * Summary of __construct
     * @param \App\Support\HelperFunctions $helpers
     */
    public function __construct(HelperFunctions $helpers)
    {
        $this->helpers = $helpers;
    }

    public function store(Request $request)
    {
        $phone = $request->input('phone');

        $phone = $this->helpers->prependPlusOneIfNumberHasNo($phone);
        
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
        $this->helpers->createConsent($request);

        return response()->json(['message' => 'Consent saved successfully.']);
    }
}
