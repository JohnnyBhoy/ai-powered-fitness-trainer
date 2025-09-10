<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NutritionPlan extends Model
{
       use HasFactory;

    protected $fillable = [
        'trainee_id', 'calories', 'protein_g', 'carbs_g', 'fats_g', 'start_date', 'end_date', 'notes'
    ];

    public function trainee()
    {
        return $this->belongsTo(User::class);
    }

    public function meals()
    {
        return $this->hasMany(NutritionMeal::class, 'plan_id');
    }

    public function supplements()
    {
        return $this->hasMany(NutritionSupplement::class, 'plan_id');
    }
}
