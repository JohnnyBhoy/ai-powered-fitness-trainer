<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpfSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription',
        'amount',
        'quantity',
        'total_amount',
        'payment_status',
        'payment_type',
        'status',
        'currency',
        'session_id',
        'payment_intent_id',
        'days_left',
        'product_name',
        'customer_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
