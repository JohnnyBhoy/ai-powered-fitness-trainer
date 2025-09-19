<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfNutritionPlan extends Model
{
    use HasFactory;

    protected $table = 'gpf_nutrition_plans';

    protected $fillable = [
        'user_id',
        'plan_name',
        'week_number',
        'day_number',
        'meal_type',
        'meal_name',
        'food_items',
        'calories',
        'protein',
        'carbs',
        'fats',
        'notes'
    ];

    protected $casts = [
        'food_items' => 'array', // JSON -> array automatically
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
