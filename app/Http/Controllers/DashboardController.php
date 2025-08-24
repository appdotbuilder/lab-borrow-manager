<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BorrowingRequest;
use App\Models\Equipment;
use App\Models\Room;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'totalEquipment' => Equipment::count(),
            'availableEquipment' => Equipment::available()->count(),
            'totalRooms' => Room::count(),
            'totalRequests' => BorrowingRequest::count(),
        ];
        
        if ($user->isAdmin()) {
            $stats['pendingRequests'] = BorrowingRequest::pending()->count();
            $recentRequests = BorrowingRequest::with(['user', 'equipment', 'room'])
                ->latest()
                ->take(5)
                ->get();
        } else {
            $stats['myRequests'] = $user->borrowingRequests()->count();
            $stats['myPendingRequests'] = $user->borrowingRequests()->where('status', 'pending')->count();
            $recentRequests = $user->borrowingRequests()
                ->with(['equipment', 'room'])
                ->latest()
                ->take(5)
                ->get();
        }
        
        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
        ]);
    }
}