<?php

use App\Http\Controllers\BorrowingRequestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Equipment routes
    Route::resource('equipment', EquipmentController::class);
    
    // Room routes  
    Route::resource('rooms', RoomController::class);
    
    // Borrowing request routes
    Route::resource('borrowing-requests', BorrowingRequestController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
