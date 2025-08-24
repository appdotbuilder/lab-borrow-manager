<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BorrowingRequest
 *
 * @property int $id
 * @property int $user_id
 * @property string $item_type
 * @property int $item_id
 * @property int $jumlah
 * @property string $tanggal_peminjaman
 * @property string $tanggal_kembali
 * @property string $status
 * @property string|null $keterangan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Equipment|\App\Models\Room|null $item
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereItemType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereJumlah($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereTanggalKembali($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereTanggalPeminjaman($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BorrowingRequest pending()
 * @method static \Database\Factories\BorrowingRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BorrowingRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'item_type',
        'item_id',
        'jumlah',
        'tanggal_peminjaman',
        'tanggal_kembali',
        'status',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_peminjaman' => 'date',
        'tanggal_kembali' => 'date',
        'jumlah' => 'integer',
    ];

    /**
     * Get the user who made the borrowing request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the item being borrowed (polymorphic).
     */
    public function item()
    {
        if ($this->item_type === 'equipment') {
            return $this->belongsTo(Equipment::class, 'item_id');
        }
        
        return $this->belongsTo(Room::class, 'item_id');
    }

    /**
     * Get the equipment if this is an equipment request.
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'item_id');
    }

    /**
     * Get the room if this is a room request.
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'item_id');
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}