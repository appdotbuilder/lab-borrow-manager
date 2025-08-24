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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('nama_alat')->comment('Equipment name');
            $table->text('deskripsi')->comment('Equipment description');
            $table->integer('jumlah')->default(1)->comment('Quantity available');
            $table->enum('kondisi', ['baik', 'rusak', 'perbaikan'])->default('baik')->comment('Equipment condition');
            $table->string('kategori')->comment('Equipment category');
            $table->timestamps();
            
            $table->index('kategori');
            $table->index('kondisi');
            $table->index(['kondisi', 'jumlah']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};