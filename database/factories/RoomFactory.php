<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Room>
     */
    protected $model = Room::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roomTypes = [
            'Ruang Kelas', 'Laboratorium', 'Ruang Rapat', 'Auditorium', 
            'Perpustakaan', 'Ruang Seminar', 'Studio', 'Workshop'
        ];
        
        $buildings = ['Gedung A', 'Gedung B', 'Gedung C', 'Gedung Utama'];
        
        return [
            'nama_ruang' => $this->faker->randomElement($roomTypes) . ' ' . $this->faker->numberBetween(101, 308),
            'lokasi' => $this->faker->randomElement($buildings) . ' Lantai ' . $this->faker->numberBetween(1, 3),
        ];
    }
}