<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consent extends Model
{
    protected $fillable = [
        'phone_number',
        'consent_status',
        'consent_text',
        'ip_address',
        'user_agent',
    ];
}
