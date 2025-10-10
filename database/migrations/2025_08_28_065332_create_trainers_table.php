<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('trainers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('full_name');
            $table->string('gender');
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->string('specialization')->nullable();
            $table->integer('experience_years')->default(0);
            $table->string('certifications')->nullable();
            $table->boolean('cpr_certified')->default(false);
            $table->date('cpr_expiry')->nullable();
            $table->boolean('liability_insurance')->default(false);
            $table->string('insurance_provider')->nullable();
            $table->boolean('consent_w9')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trainers');
    }
};
