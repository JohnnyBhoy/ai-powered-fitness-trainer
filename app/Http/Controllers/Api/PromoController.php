<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PromoController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        return Inertia::render('Auth/PromoCode', [
            'user_id' => $userId,
        ]);
    }
    public function update(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'is_promo' => 'required|numeric',
        ]);

        try {
            $user = User::findOrFail($request->user_id);

            $user->is_promo = $request->input('is_promo');

            $user->save();
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json([
            'message' => 'Promo status updated successfully.',
            'data' => [
                'is_promo' => $user->is_promo,
            ],
        ]);
    }
}
