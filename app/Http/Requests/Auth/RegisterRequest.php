<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstName'            => 'required|string|max:255',
            'lastName'             => 'required|string|max:255',
            'email'                => 'required|email|unique:users,email',
            'username'             => 'required|string|unique:users,user_name|max:255',
            'password'             => 'required|string|min:8|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'password.confirmed' => 'Passwords do not match.',
        ];
    }
}
