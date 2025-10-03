<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfWeeklyProgramLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'week_number',
        'program_data',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
