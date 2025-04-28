<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoalRequest extends FormRequest
{
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'goal'              => 'required|string|max:1000',
            'why'               => 'required|string|max:1000',
            'past_obstacles'    => 'required|string|max:1000',
            'current_struggles' => 'required|string|max:1000',
            'user_id'    => 'required|integer',
        ];
    }
}
