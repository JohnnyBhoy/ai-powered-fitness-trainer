<?php

namespace App\Http\Controllers;

use App\Services\TwilioService;
use Illuminate\Http\Request;

class MessageController
{
    protected $twilioService;

    public function __construct(TwilioService $twilioService)
    {
        $this->twilioService = $twilioService;
    }

    /**
     * Resend OTP to user
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function resendOtp(Request $request)
    {
        try {
            $this->twilioService->resendOtp($request->input('user_id'));
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
