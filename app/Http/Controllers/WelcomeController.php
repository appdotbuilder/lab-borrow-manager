<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BorrowingRequest;
use App\Models\Equipment;
use App\Models\Room;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index()
    {
        $stats = [
            'totalEquipment' => Equipment::count(),
            'availableEquipment' => Equipment::available()->count(),
            'totalRooms' => Room::count(),
            'totalRequests' => BorrowingRequest::count(),
        ];
        
        $featuredEquipment = Equipment::available()->take(3)->get();
        $featuredRooms = Room::take(3)->get();
        
        return Inertia::render('welcome', [
            'stats' => $stats,
            'featuredEquipment' => $featuredEquipment,
            'featuredRooms' => $featuredRooms,
        ]);
    }
}