<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTraineeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // You can restrict to admin or trainer if needed
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'first_name'        => 'required|string|max:100',
            'last_name'         => 'required|string|max:100',
            'email'             => 'required|email|unique:users,email',
            'user_name'         => 'required|string|max:100|unique:users,user_name',
            'password'          => 'required|string|min:6',
            'role'              => 'required|integer',
            'is_promo'          => 'required|boolean',
            'city'              => 'nullable|string|max:150',
            'state'             => 'nullable|string|max:150',
            'phone_number'      => 'nullable|string|max:50',
            'age'               => 'nullable|integer|min:1|max:120',
            'sex'               => 'nullable|string|in:male,female,other',
            'current_weight'    => 'nullable|numeric|min:0',
            'goal_weight'       => 'nullable|numeric|min:0',
            'fitness_level'     => 'nullable|string|max:255',
            'equipment_access'  => 'nullable|string|max:255',
            'food_allergies'    => 'nullable|string|max:255',
            'strictness_level'  => 'required|integer|min:1|max:5',
        ];
    }

    /**
     * Customize validation messages (optional).
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'The email address is already registered.',
            'user_name.unique' => 'That username is already taken.',
            'password.min' => 'Password must be at least 6 characters.',
        ];
    }
}
