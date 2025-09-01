<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'gender',
        'phone',
        'email',
        'city',
        'state',
        'zip',
        'specialization',
        'experience_years',
        'certifications',
        'cpr_certified',
        'cpr_expiry',
        'liability_insurance',
        'insurance_provider',
        'consent_w9',
    ];

    /**
     * Trainer belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
