<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfNutritionPlanLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'week_number',
        'nutrition_plan',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
