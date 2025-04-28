<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Biometric extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'city',
        'state',
        'phone_number',
        'age',
        'sex',
        'current_weight',
        'goal_weight',
        'fitness_level',
        'equipment_access',
        'food_allergies',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
