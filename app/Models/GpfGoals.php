<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfGoals extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'goal',
        'why',
        'past_obstacles',
        'current_struggles',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
