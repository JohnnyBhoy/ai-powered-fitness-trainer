<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use App\Support\HelperFunctions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NonGoPeakFitTraineeController extends Controller
{

    protected $userService;
    protected $helperFunctions;

    public function __construct(UserService $userService, HelperFunctions $helperFunctions)
    {
        $this->userService = $userService;
        $this->helperFunctions = $helperFunctions;
    }


    /**
     * Table page for Gopeakfit Trainees
     * @param Request $request
     * @return  Response || Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse|Response
    {
        $pageNumber = $request->get('page_number') ?? 1;
        $perPage = $request->get('per_page') ?? 10;
        $strictnessLevel = $request->get('strictness_level') ?? 0;

        try {
            $result =  $this->userService->getPaginateNonGoPeakFitUsers($pageNumber, $perPage, $strictnessLevel);
        } catch (\Throwable $th) {
            throw $th;
        }

        if (request()->wantsJson() || $pageNumber != 1) {
            return $this->helperFunctions->jsonReturn($pageNumber, $result, $perPage);
        }

        return Inertia::render('Trainee/NonGpfTrainee/NonGpfTrainee', [
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
