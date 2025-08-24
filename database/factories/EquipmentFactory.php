<?php

namespace Database\Factories;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Equipment>
     */
    protected $model = Equipment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Elektronik', 'Laboratorium', 'Olahraga', 'Audio Visual', 'Komputer'];
        $equipment = [
            'Proyektor LCD', 'Laptop', 'Mikroskop', 'Kamera Digital', 'Speaker',
            'Papan Tulis', 'Meja Lab', 'Kursi Roda', 'Printer', 'Scanner',
        ];

        return [
            'nama_alat' => $this->faker->randomElement($equipment),
            'deskripsi' => $this->faker->sentence(10),
            'jumlah' => $this->faker->numberBetween(1, 10),
            'kondisi' => $this->faker->randomElement(['baik', 'rusak', 'perbaikan']),
            'kategori' => $this->faker->randomElement($categories),
        ];
    }

    /**
     * Indicate that the equipment is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'kondisi' => 'baik',
            'jumlah' => $this->faker->numberBetween(1, 5),
        ]);
    }
}