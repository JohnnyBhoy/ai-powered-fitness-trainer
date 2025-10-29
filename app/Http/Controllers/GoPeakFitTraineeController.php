<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTraineeRequest;
use App\Models\GpfBiometric;
use App\Services\BiometricService;
use App\Services\GoalService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;


class GoPeakFitTraineeController extends Controller
{
    protected $userService;
    protected $helperFunctions;
    protected $biometricService;
    protected $goalService;

    public function __construct(
        UserService $userService,
        HelperFunctions $helperFunctions,
        BiometricService $biometricService,
        GoalService $goalService,
    ) {
        $this->userService = $userService;
        $this->helperFunctions = $helperFunctions;
        $this->biometricService = $biometricService;
        $this->goalService = $goalService;
    }


    /**
     * Table page for Gopeakfit Trainees
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse|Response
    {
        $perPage = $request->query('per_page') ?? 5;
        $pageNumber = $request->query('page_number') ?? 1;
        $strictnessLevel = $request->query('strictness_level') ?? 1;

        try {
            $result =  $this->userService->getPaginateGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }

        if (request()->wantsJson() || $pageNumber != 1) {
            return  $this->helperFunctions->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainee/GpfTrainee/GpfTrainee', [
            'data' => $result,
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
     * Store a newly created trainee in both users and gpf_biometrics tables.
     */
    public function store(CreateTraineeRequest $request)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validated();

            // User table data
            $userData = [
                'first_name' => $validated['first_name'],
                'last_name'  => $validated['last_name'],
                'email'      => $validated['email'],
                'user_name'  => $validated['user_name'],
                'password'   => Hash::make($validated['password']),
                'role'       => $validated['role'],
                'is_promo'   => $validated['is_promo'] ?? 0,
            ];

            // Create user
            $user = $this->userService->createUser($userData);

            // Prepare the biometrics data
            $biometricData = [
                'user_id'          => $user->id,
                'city'             => $validated['city'] ?? null,
                'state'            => $validated['state'] ?? null,
                'phone_number'     => $validated['phone_number'] ?? null,
                'age'              => $validated['age'] ?? null,
                'sex'              => $validated['sex'] ?? null,
                'current_weight'   => $validated['current_weight'] ?? null,
                'goal_weight'      => $validated['goal_weight'] ?? null,
                'fitness_level'    => $validated['fitness_level'] ?? null,
                'equipment_access' => $validated['equipment_access'] ?? null,
                'food_allergies'   => $validated['food_allergies'] ?? null,
                'strictness_level' => $validated['strictness_level'] ?? 1,
            ];


            // Create biometric info linked to user_id
            $this->biometricService->create($biometricData);

            // Goals data
            $goalData = [
                'user_id' => $user->id,
                'goal' => $request->get('goal') ?? "",
                'why' => $request->get('why') ?? "",
                'past_obstacles' => $request->get('past_obstacles') ?? "",
                'current_strugggles' => $request->get('current_strugggles') ?? "",
            ];

            // Create goals in db
            $this->goalService->createGoal($goalData);

            DB::commit();

            return redirect()->back()->with('success', 'Trainee created successfully');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error creating trainee: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create trainee.',
                'error'   => $e->getMessage(),
            ], 500);
        }
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
     * Update strictness level in trainee
     * @param Request $request HttpRequest
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        $strictnessLevel = $request->get('strictness_level');

        try {
            $update = GpfBiometric::where('user_id', $userId)
                ->update([
                    'strictness_level' => $strictnessLevel
                ]);
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json([
            'success' => true,
            'data' => $update,
            'status' => 200,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
