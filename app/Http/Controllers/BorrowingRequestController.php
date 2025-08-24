<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBorrowingRequestRequest;
use App\Models\BorrowingRequest;
use App\Models\Equipment;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowingRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $borrowingRequests = BorrowingRequest::with(['user', 'equipment', 'room'])
                ->latest()
                ->paginate(10);
        } else {
            $borrowingRequests = $user->borrowingRequests()
                ->with(['equipment', 'room'])
                ->latest()
                ->paginate(10);
        }
        
        return Inertia::render('borrowing-requests/index', [
            'borrowingRequests' => $borrowingRequests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $equipment = Equipment::available()->get();
        $rooms = Room::all();
        
        return Inertia::render('borrowing-requests/create', [
            'equipment' => $equipment,
            'rooms' => $rooms,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBorrowingRequestRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        
        // Set jumlah to 1 for rooms
        if ($data['item_type'] === 'room') {
            $data['jumlah'] = 1;
        }
        
        $borrowingRequest = BorrowingRequest::create($data);

        return redirect()->route('borrowing-requests.show', $borrowingRequest)
            ->with('success', 'Permintaan peminjaman berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BorrowingRequest $borrowingRequest)
    {
        $borrowingRequest->load(['user', 'equipment', 'room']);
        
        return Inertia::render('borrowing-requests/show', [
            'borrowingRequest' => $borrowingRequest,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BorrowingRequest $borrowingRequest)
    {
        // Only admins can update status
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $request->validate([
            'status' => 'required|in:pending,approved,rejected,returned',
        ]);
        
        $borrowingRequest->update([
            'status' => $request->status,
        ]);

        return redirect()->route('borrowing-requests.show', $borrowingRequest)
            ->with('success', 'Status permintaan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BorrowingRequest $borrowingRequest)
    {
        // Only the owner or admin can delete
        if (!auth()->user()->isAdmin() && $borrowingRequest->user_id !== auth()->id()) {
            abort(403);
        }
        
        $borrowingRequest->delete();

        return redirect()->route('borrowing-requests.index')
            ->with('success', 'Permintaan peminjaman berhasil dihapus.');
    }
}