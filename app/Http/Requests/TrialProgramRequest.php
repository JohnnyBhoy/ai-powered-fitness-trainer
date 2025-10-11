<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrialProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'trialPrograms' => ['required', 'array', 'min:1'],

            // Each item inside the array
            'trialPrograms.*.id' => ['required', 'integer', 'exists:trial_programs,id'],
            'trialPrograms.*.program_name' => ['required', 'string', 'max:255'],
            'trialPrograms.*.day' => ['required', 'integer', 'min:1'],
            'trialPrograms.*.focus' => ['required', 'string'],
            'trialPrograms.*.warm_up' => ['required', 'string'],

            // Workout is an array of strings
            'trialPrograms.*.workout' => ['required', 'array'],
            'trialPrograms.*.workout.*' => ['string'],

            'trialPrograms.*.cool_down' => ['required', 'string'],
            'trialPrograms.*.alignment' => ['required', 'string'],
        ];
    }
}
