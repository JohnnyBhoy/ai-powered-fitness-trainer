<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TrainerController extends Controller
{
    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $userId = auth()->user()->id;
        $trainees = User::where('trainer_id', $userId)->get()->toArray();
        $programs = [];

        try {
            return Inertia::render('Trainer/Dashboard', [
                'trainees' => $trainees,
                'programs' => $programs,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Summary of index
     * @return \Inertia\Response
     */
    public function show(): Response
    {
        $userId = auth()->user()->id;
        $trainees = DB::table('users as u1')
            ->leftJoin('gpf_biometrics as gb', 'u1.id', '=', 'gb.user_id')
            ->leftJoin('gpf_goals as g', 'u1.id', '=', 'g.user_id')
            ->select(
                'u1.*',
                'gb.*',
                'g.*'
            )
            ->where('u1.trainer_id', $userId)
            ->whereNotNull('trainer_id')
            ->get()
            ->toArray();

        try {
            return Inertia::render('Trainer/Trainees', [
                'trainees' => $trainees,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
