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
            // ✅ Basic Info
            'first_name'        => 'required|string|regex:/^[A-Za-z\s\-]+$/|max:100',
            'last_name'         => 'required|string|regex:/^[A-Za-z\s\-]+$/|max:100',

            // ✅ Auth & Identity
            'email'             => 'required|string|email:rfc,dns|lowercase|unique:users,email',
            'user_name'         => 'required|string|regex:/^[A-Za-z0-9_.-]+$/|max:100|unique:users,user_name',
            'password'          => [
                'required',
                'string',
                'min:8',
                'max:255',
                'regex:/[A-Z]/',      // at least one uppercase
                'regex:/[a-z]/',      // at least one lowercase
                'regex:/[0-9]/',      // at least one number
                'regex:/[@$!%*#?&]/', // at least one special char
            ],

            // ✅ Role & Status
            'role'              => 'required|integer|in:1,2,3', // Example: 1=Admin,2=Trainer,3=Member
            'is_promo'          => 'required|boolean',
            'strictness_level'  => 'required|integer|min:1|max:5',

            // ✅ Optional Profile Info
            'city'              => 'nullable|string|max:150',
            'state'             => 'nullable|string|max:150',
            'phone_number'      => 'nullable|string|max:20|regex:/^\+?[0-9\s()-]+$/',
            'age'               => 'nullable|integer|min:10|max:120',
            'sex'               => 'nullable|string|in:male,female,other',
            'current_weight'    => 'nullable|numeric|min:20|max:500',
            'goal_weight'       => 'nullable|numeric|min:20|max:500',
            'fitness_level'     => 'nullable|string|max:255',
            'equipment_access'  => 'nullable|string|max:255',
            'food_allergies'    => 'nullable|string|max:255',
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
