import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface Equipment {
    id: number;
    nama_alat: string;
    kategori: string;
    kondisi: string;
    jumlah: number;
}

interface Room {
    id: number;
    nama_ruang: string;
    lokasi: string;
}

interface Props {
    equipment: Equipment[];
    rooms: Room[];
    [key: string]: unknown;
}

interface BorrowingRequestFormData {
    item_type: string;
    item_id: number;
    jumlah: number;
    tanggal_peminjaman: string;
    tanggal_kembali: string;
    keterangan: string;
    [key: string]: string | number | boolean | File | File[] | null | undefined;
}

export default function CreateBorrowingRequest({ equipment, rooms }: Props) {
    const [selectedType, setSelectedType] = useState<string>('equipment');
    
    const { data, setData, post, processing, errors } = useForm<BorrowingRequestFormData>({
        item_type: 'equipment',
        item_id: 0,
        jumlah: 1,
        tanggal_peminjaman: '',
        tanggal_kembali: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('borrowing-requests.store'));
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setData({
            ...data,
            item_type: type,
            item_id: 0,
            jumlah: type === 'room' ? 1 : data.jumlah,
        });
    };

    const selectedItems = selectedType === 'equipment' ? equipment : rooms;

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <AppShell>
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Heading title="➕ Ajukan Peminjaman Baru" />
                    <p className="text-gray-600 mt-2">
                        Isi formulir di bawah untuk mengajukan peminjaman peralatan atau ruangan.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Item Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                🔍 Jenis Item *
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('equipment')}
                                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                                        selectedType === 'equipment'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">🛠️</div>
                                    <div className="font-medium">Peralatan</div>
                                    <div className="text-sm text-gray-600">Pinjam alat dan peralatan</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('room')}
                                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                                        selectedType === 'room'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">🏠</div>
                                    <div className="font-medium">Ruangan</div>
                                    <div className="text-sm text-gray-600">Booking ruang dan fasilitas</div>
                                </button>
                            </div>
                            {errors.item_type && (
                                <p className="text-red-600 text-sm mt-1">{errors.item_type}</p>
                            )}
                        </div>

                        {/* Item Selection */}
                        <div>
                            <label htmlFor="item_id" className="block text-sm font-medium text-gray-700 mb-2">
                                {selectedType === 'equipment' ? '🛠️ Pilih Alat *' : '🏠 Pilih Ruangan *'}
                            </label>
                            <select
                                id="item_id"
                                value={data.item_id}
                                onChange={(e) => setData('item_id', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value={0}>
                                    {selectedType === 'equipment' ? 'Pilih alat...' : 'Pilih ruangan...'}
                                </option>
                                {selectedItems.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {selectedType === 'equipment' 
                                            ? `${(item as Equipment).nama_alat} (${(item as Equipment).kategori}) - Tersedia: ${(item as Equipment).jumlah}`
                                            : `${(item as Room).nama_ruang} - ${(item as Room).lokasi}`
                                        }
                                    </option>
                                ))}
                            </select>
                            {errors.item_id && (
                                <p className="text-red-600 text-sm mt-1">{errors.item_id}</p>
                            )}
                        </div>

                        {/* Quantity (only for equipment) */}
                        {selectedType === 'equipment' && (
                            <div>
                                <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 mb-2">
                                    📦 Jumlah *
                                </label>
                                <input
                                    type="number"
                                    id="jumlah"
                                    min="1"
                                    value={data.jumlah}
                                    onChange={(e) => setData('jumlah', parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.jumlah && (
                                    <p className="text-red-600 text-sm mt-1">{errors.jumlah}</p>
                                )}
                            </div>
                        )}

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="tanggal_peminjaman" className="block text-sm font-medium text-gray-700 mb-2">
                                    📅 Tanggal Peminjaman *
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_peminjaman"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={data.tanggal_peminjaman}
                                    onChange={(e) => setData('tanggal_peminjaman', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.tanggal_peminjaman && (
                                    <p className="text-red-600 text-sm mt-1">{errors.tanggal_peminjaman}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="tanggal_kembali" className="block text-sm font-medium text-gray-700 mb-2">
                                    📅 Tanggal Pengembalian *
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_kembali"
                                    min={data.tanggal_peminjaman || getTomorrowDate()}
                                    value={data.tanggal_kembali}
                                    onChange={(e) => setData('tanggal_kembali', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.tanggal_kembali && (
                                    <p className="text-red-600 text-sm mt-1">{errors.tanggal_kembali}</p>
                                )}
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Keterangan (Opsional)
                            </label>
                            <textarea
                                id="keterangan"
                                rows={3}
                                value={data.keterangan}
                                onChange={(e) => setData('keterangan', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Tambahkan catatan atau informasi tambahan..."
                            />
                            {errors.keterangan && (
                                <p className="text-red-600 text-sm mt-1">{errors.keterangan}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                ← Kembali
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Mengirim...' : '📤 Ajukan Peminjaman'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Available Items Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h3 className="font-medium text-blue-900 mb-2">🛠️ Peralatan Tersedia</h3>
                        <p className="text-blue-700 text-sm mb-2">
                            {equipment.filter(e => e.kondisi === 'baik' && e.jumlah > 0).length} dari {equipment.length} alat tersedia
                        </p>
                        {equipment.filter(e => e.kondisi === 'baik' && e.jumlah > 0).slice(0, 3).map(item => (
                            <div key={item.id} className="text-xs text-blue-600 mb-1">
                                • {item.nama_alat} ({item.jumlah} tersedia)
                            </div>
                        ))}
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h3 className="font-medium text-purple-900 mb-2">🏠 Ruangan Tersedia</h3>
                        <p className="text-purple-700 text-sm mb-2">
                            {rooms.length} ruangan tersedia untuk booking
                        </p>
                        {rooms.slice(0, 3).map(room => (
                            <div key={room.id} className="text-xs text-purple-600 mb-1">
                                • {room.nama_ruang} - {room.lokasi}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}