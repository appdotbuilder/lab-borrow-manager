import React from 'react';
import { useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface EquipmentFormData {
    nama_alat: string;
    deskripsi: string;
    jumlah: number;
    kondisi: string;
    kategori: string;
    [key: string]: string | number | boolean | File | File[] | null | undefined;
}

export default function CreateEquipment() {
    const { data, setData, post, processing, errors } = useForm<EquipmentFormData>({
        nama_alat: '',
        deskripsi: '',
        jumlah: 1,
        kondisi: 'baik',
        kategori: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('equipment.store'));
    };

    return (
        <AppShell>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Heading title="➕ Tambah Peralatan Baru" />
                    <p className="text-gray-600 mt-2">
                        Isi informasi lengkap tentang peralatan yang akan ditambahkan ke sistem.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama_alat" className="block text-sm font-medium text-gray-700 mb-2">
                                🏷️ Nama Alat *
                            </label>
                            <input
                                type="text"
                                id="nama_alat"
                                value={data.nama_alat}
                                onChange={(e) => setData('nama_alat', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan nama alat..."
                            />
                            {errors.nama_alat && (
                                <p className="text-red-600 text-sm mt-1">{errors.nama_alat}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-2">
                                📂 Kategori *
                            </label>
                            <input
                                type="text"
                                id="kategori"
                                value={data.kategori}
                                onChange={(e) => setData('kategori', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contoh: Elektronik, Laboratorium, Audio Visual..."
                            />
                            {errors.kategori && (
                                <p className="text-red-600 text-sm mt-1">{errors.kategori}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Deskripsi *
                            </label>
                            <textarea
                                id="deskripsi"
                                rows={4}
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Jelaskan detail dan spesifikasi alat..."
                            />
                            {errors.deskripsi && (
                                <p className="text-red-600 text-sm mt-1">{errors.deskripsi}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 mb-2">
                                    📦 Jumlah *
                                </label>
                                <input
                                    type="number"
                                    id="jumlah"
                                    min="1"
                                    value={data.jumlah}
                                    onChange={(e) => setData('jumlah', parseInt(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.jumlah && (
                                    <p className="text-red-600 text-sm mt-1">{errors.jumlah}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="kondisi" className="block text-sm font-medium text-gray-700 mb-2">
                                    🔧 Kondisi *
                                </label>
                                <select
                                    id="kondisi"
                                    value={data.kondisi}
                                    onChange={(e) => setData('kondisi', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="baik">✅ Baik</option>
                                    <option value="rusak">❌ Rusak</option>
                                    <option value="perbaikan">🔧 Dalam Perbaikan</option>
                                </select>
                                {errors.kondisi && (
                                    <p className="text-red-600 text-sm mt-1">{errors.kondisi}</p>
                                )}
                            </div>
                        </div>

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
                                {processing ? 'Menyimpan...' : '💾 Simpan Alat'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}