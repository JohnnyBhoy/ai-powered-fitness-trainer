<?php

namespace App\Http\Controllers;

use App\Models\GpfSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    public function getValues(Request $request)
    {
        $userId = $request->query('userId');

        if (!$userId) {
            return response()->json(['error' => 'Missing userId'], 400);
        }

        $subscriptions = GpfSubscription::where('user_id', $userId)
            ->select('subscription')
            ->get();

        return response()->json($subscriptions);
    }
}

