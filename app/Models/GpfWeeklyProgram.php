<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfWeeklyProgram extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'gpf_weekly_programs';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
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

    /**
     * Get the user that owns the weekly program.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
