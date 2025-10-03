<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainerRequest;
use App\Models\GpfTrainer;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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

    /**
     * Summary of create
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Trainer/Create');
    }

    /**
     * Summary of store
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(TrainerRequest $request)
    {
        // Step 1: Create the user first
        $user = User::create([
            'first_name'     => explode($request->full_name, "")[0],
            'last_name'     => explode($request->full_name, "")[1],
            'email'    => $request->email,
            'password' => Hash::make('gpftrainer2025'),
        ]);

        // Step 2: Create the trainer profile linked to the user
        GpfTrainer::create(array_merge(
            $request->validated(),
            ['user_id' => $user->id]
        ));

        return redirect()
            ->route('trainers.index')
            ->with('success', 'Trainer registered successfully!');
    }
}
