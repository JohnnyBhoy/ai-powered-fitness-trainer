<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BiometricRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'city'              => 'required|string|max:255',
            'state'             => 'required|string|max:255',
            'phone_number'      => 'required|string|max:20|unique:gpf_biometrics,phone_number',
            'age'               => 'required|integer|min:0|max:120',
            'sex'               => 'required|in:male,female,other',
            'current_weight'    => 'required|numeric|min:0',
            'goal_weight'       => 'required|numeric|min:0',
            'fitness_level'     => 'required|string|max:100',
            'strictness_level'  => 'required|numeric|min:0',
            'equipment_access'  => 'required|string|max:100',
            'food_allergies'    => 'required|string',
            'user_id'           => 'required|integer',
        ];
    }
}
