<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfFiveDaysProgram extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'gpf_five_days_programs';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'program_name',
        'day',
        'focus',
        'warm_up',
        'workout',
        'cool_down',
        'alignment',
    ];

    /**
     * Cast attributes to specific types.
     */
    protected $casts = [
        'workout' => 'array', // Automatically casts JSON to array
    ];
}
