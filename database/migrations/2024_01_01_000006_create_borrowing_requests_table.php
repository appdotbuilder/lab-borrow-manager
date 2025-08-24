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
        Schema::create('borrowing_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('item_type', ['equipment', 'room']);
            $table->unsignedBigInteger('item_id');
            $table->integer('jumlah')->default(1);
            $table->date('tanggal_peminjaman');
            $table->date('tanggal_kembali');
            $table->enum('status', ['pending', 'approved', 'rejected', 'returned'])->default('pending');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['item_type', 'item_id']);
            $table->index('status');
            $table->index(['tanggal_peminjaman', 'tanggal_kembali']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowing_requests');
    }
};