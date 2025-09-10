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
        Schema::create('nutrition_supplements', function (Blueprint $table) {
        $table->id();
        $table->foreignId('plan_id')->constrained('nutrition_plans')->cascadeOnDelete();
        $table->string('name');
        $table->string('dosage');
        $table->text('notes')->nullable();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutrition_supplements');
    }
};
