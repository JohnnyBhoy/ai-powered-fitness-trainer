<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gpf_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->unique();
            $table->string('subscription')->nullable();
            $table->integer('amount')->nullable();
            $table->integer('quantity')->nullable();
            $table->integer('total_amount')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('payment_type')->nullable();
            $table->string('status')->nullable();
            $table->string('currency')->nullable();
            $table->string('session_id')->nullable()->unique();
            $table->string('payment_intent_id')->nullable()->unique();
            $table->string('days_left')->nullable();
            $table->string('product_name')->nullable();
            $table->string('customer_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gpf_subscriptions');
    }
};
