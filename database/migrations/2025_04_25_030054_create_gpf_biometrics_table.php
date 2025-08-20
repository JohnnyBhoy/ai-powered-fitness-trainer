<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('gpf_biometrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->unique();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('phone_number')->nullable();
            $table->integer('age')->nullable();
            $table->enum('sex', ['male', 'female', 'other'])->nullable();
            $table->float('current_weight')->nullable();
            $table->float('goal_weight')->nullable();
            $table->string('fitness_level')->nullable();
            $table->string('equipment_access')->nullable();
            $table->text('food_allergies')->nullable();
            $table->tinyInteger('strictness_level')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('gpf_biometrics');
    }
};
