<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraineeProgress extends Model
{
    protected $fillable = [
        'user_id',
        'weight_lbs',
        'week',
        'body_fat_percent',
        'muscle_mass_lbs',
        'recorded_at',
        'notes',
    ];

    public function trainee(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
