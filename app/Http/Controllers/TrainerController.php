<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainerRequest;
use App\Services\TrainerService;
use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TrainerController extends Controller
{
    protected $userService;
    protected $helperFunctions;
    protected $trainerService;

    public function __construct(
        UserService $userService,
        HelperFunctions $helperFunctions,
        TrainerService $trainerService
    ) {
        $this->userService = $userService;
        $this->helperFunctions = $helperFunctions;
        $this->trainerService = $trainerService;
    }

    /**
     * Table page for Trainers
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse|Response
    {
        $pageNumber = $request->get('page_number') ?? 1;
        $perPage = $request->get('per_page') ?? 10;

        try {
            $result =  $this->userService->getPaginateTrainers($pageNumber, $perPage);
        } catch (\Throwable $th) {
            throw $th;
        }

        // This will be the return if the request is coming from api
        if (request()->wantsJson() || $pageNumber != 1) {
            $this->helperFunctions->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainer/Trainer', [
            'data' => $result,
        ]);
    }
    /**
     * Show all trainers
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
     * Create Trainer Page
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Trainer/Create');
    }

    /**
     * Create Trainer
     * @param \App\Http\Requests\TrainerRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(TrainerRequest $request)
    {
        try {
            $this->trainerService->store([...$request->validated()]);

            return redirect()->back()->with('success', 'Trainer created successfully');
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
