<?php

namespace App\Http\Controllers;

use App\Http\Requests\BiometricRequest;
use App\Models\Biometric;
use Illuminate\Support\Facades\Auth;

class BiometricController extends Controller
{
    public function store(BiometricRequest $request)
    {
        $biometric = Biometric::create([
            ...$request->validated(),
        ]);

        return response()->json([
            'message' => 'Biometrics saved successfully!',
            'biometric' => $biometric
        ]);
    }
}
