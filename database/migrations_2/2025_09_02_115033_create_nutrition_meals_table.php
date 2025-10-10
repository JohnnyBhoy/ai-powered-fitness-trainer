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
      Schema::create('nutrition_meals', function (Blueprint $table) {
        $table->id();
        $table->foreignId('plan_id')->constrained('nutrition_plans')->cascadeOnDelete();
        $table->string('meal_name');
        $table->time('meal_time');
        $table->text('description');
        $table->decimal('protein_g', 5, 2);
        $table->decimal('carbs_g', 5, 2);
        $table->decimal('fats_g', 5, 2);
        $table->integer('calories');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_meals');
    }
};
