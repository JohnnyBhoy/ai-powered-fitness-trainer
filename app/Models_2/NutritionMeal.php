<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionMeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id', 'meal_name', 'meal_time', 'description', 'protein_g', 'carbs_g', 'fats_g', 'calories'
    ];

    public function plan()
    {
        return $this->belongsTo(NutritionPlan::class, 'plan_id');
    }
}
