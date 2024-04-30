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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('video1');
            $table->string('video2')->nullable();
            $table->string('video3')->nullable();
            $table->string('video4')->nullable();
            $table->string('video5')->nullable();
            $table->string('video6')->nullable();
            $table->string('video7')->nullable();
            $table->string('video8')->nullable();
            $table->string('video9')->nullable();
            $table->string('video10')->nullable();
            $table->unsignedBigInteger('chapter_id');
            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
