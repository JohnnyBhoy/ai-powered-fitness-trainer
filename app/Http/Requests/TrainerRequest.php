<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:trainers,email',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip' => 'required|string|max:10',
            'specialization' => 'nullable|string',
            'experience_years' => 'nullable|integer|min:0',
            'certifications' => 'nullable|string',
            'cpr_certified' => 'boolean',
            'cpr_expiry' => 'nullable|date',
            'liability_insurance' => 'boolean',
            'insurance_provider' => 'nullable|string',
            'consent_w9' => 'boolean',
        ];
    }
}
