<?php

namespace Database\Factories;

use App\Models\BorrowingRequest;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BorrowingRequest>
 */
class BorrowingRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\BorrowingRequest>
     */
    protected $model = BorrowingRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $itemType = $this->faker->randomElement(['equipment', 'room']);
        $startDate = $this->faker->dateTimeBetween('now', '+30 days');
        $endDate = $this->faker->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +7 days');
        
        if ($itemType === 'equipment') {
            $equipment = Equipment::inRandomOrder()->first();
            $itemId = $equipment ? $equipment->id : Equipment::factory()->create()->id;
            $jumlah = $this->faker->numberBetween(1, 3);
        } else {
            $room = Room::inRandomOrder()->first();
            $itemId = $room ? $room->id : Room::factory()->create()->id;
            $jumlah = 1;
        }

        return [
            'user_id' => function () {
                $user = User::inRandomOrder()->first();
                return $user ? $user->id : User::factory()->create()->id;
            },
            'item_type' => $itemType,
            'item_id' => $itemId,
            'jumlah' => $jumlah,
            'tanggal_peminjaman' => $startDate,
            'tanggal_kembali' => $endDate,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'returned']),
            'keterangan' => $this->faker->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}