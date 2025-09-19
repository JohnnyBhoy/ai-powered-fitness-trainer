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
        Schema::create('gpf_weekly_programs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // FK to users table, nullable for generic programs
            $table->string('program_name'); // e.g. Weekly Training Program
            $table->unsignedTinyInteger('day'); // 1 to 7
            $table->string('focus');
            $table->string('warm_up');
            $table->json('workout'); // Store exercises as JSON
            $table->string('cool_down');
            $table->string('alignment')->nullable(); // Optional explanation
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // No initial values inserted
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gpf_weekly_programs');
    }
};
