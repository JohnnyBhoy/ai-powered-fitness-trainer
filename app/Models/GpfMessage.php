<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfMessage extends Model
{
    use HasFactory;

    /**
     * Table User Workout conversation
     *
     * @var string
     */
    protected $table = 'gpf_messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'conversations',
        'phone_number',
    ];
}
