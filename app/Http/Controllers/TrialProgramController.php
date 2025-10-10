<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrialProgramRequest;
use App\Models\GpfFiveDaysProgram;
use App\Services\TrialProgramService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TrialProgramController extends Controller
{
    protected $traineeProgramService;

    /**
     * Summary of __construct
     * @param \App\Services\TrialProgramService $trialProgramService
     */
    public function __construct(TrialProgramService $trialProgramService)
    {
        $this->trialProgramService = $trialProgramService;
    }

    /**
     * Display a listing of the resource
     * @return \Inertia\Response
     */
    public function index()
    {
        // Retrieve program details
        $program = GpfFiveDaysProgram::orderBy('day')->get();


        return Inertia::render('Admin/TraineeProgress/Programs/Index', [
            'programs' => $program
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->get('trialPrograms');

        try {
            DB::transaction(function () use ($validated) {
                foreach ($validated as $programData) {
                    $program = GpfFiveDaysProgram::find($programData['id']);

                    if ($program) {
                        $program->update([
                            'program_name' => $programData['program_name'],
                            'day' => $programData['day'],
                            'focus' => $programData['focus'] ?? null,
                            'warm_up' => $programData['warm_up'] ?? null,
                            'workout' => $programData['workout'] ?? null, // array OK if JSON field
                            'cool_down' => $programData['cool_down'] ?? null,
                            'alignment' => $programData['alignment'] ?? null,
                        ]);
                    }
                }
            });

            return response()->json([
                'message' => 'Trial programs updated successfully.',
                'success' => true,
                'newTrialProgram' => $validated,
            ], 200);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
