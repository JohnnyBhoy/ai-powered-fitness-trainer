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
        Schema::create('gpf_nutrition_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('plan_name')->default('Plan 1');
            $table->unsignedInteger('week_number')->default(1);
            $table->unsignedTinyInteger('day_number'); // 1–7
            $table->enum('meal_type', ['breakfast', 'snack', 'lunch', 'dinner']);
            $table->string('meal_name');
            $table->json('food_items')->nullable(); // Store ingredients as JSON
            $table->integer('calories')->nullable();
            $table->decimal('protein', 8, 2)->nullable();
            $table->decimal('carbs', 8, 2)->nullable();
            $table->decimal('fats', 8, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gpf_nutrition_plans');
    }
};
