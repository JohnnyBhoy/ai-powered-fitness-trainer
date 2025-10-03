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
        Schema::create('gpf_weekly_program_logs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->integer('week_number')->default(1);
            $table->longText('program_data');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gpf_weekly_program_logs');
    }
};
