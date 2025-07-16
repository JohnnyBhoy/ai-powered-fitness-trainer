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
    Schema::table('gpf_biometrics', function (Blueprint $table) {
      $table->tinyInteger('strictness_level')->default(0);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('gpf_biometrics', function (Blueprint $table) {
      $table->dropColumn('strictness_level');
    });
  }
};
