<?php

namespace Database\Seeders;

use App\Models\BorrowingRequest;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::factory()->create([
            'name' => 'Peminjam User',
            'email' => 'peminjam@example.com',
            'password' => Hash::make('password'),
            'role' => 'peminjam',
        ]);

        // Create additional users
        User::factory(8)->create();

        // Create equipment
        Equipment::factory(20)->create();

        // Create rooms
        Room::factory(10)->create();

        // Create borrowing requests
        BorrowingRequest::factory(30)->create();
    }
}
