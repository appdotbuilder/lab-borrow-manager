import React from 'react';
import { useForm, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface RoomFormData {
    nama_ruang: string;
    lokasi: string;
    [key: string]: string | number | boolean | File | File[] | null | undefined;
}

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm<RoomFormData>({
        nama_ruang: '',
        lokasi: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rooms.store'));
    };

    const handleBack = () => {
        router.visit(route('rooms.index'));
    };

    return (
        <AppShell>
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Heading title="🏠 Tambah Ruangan Baru" />
                    <p className="text-gray-600 mt-2">
                        Isi informasi lengkap tentang ruangan yang akan ditambahkan ke sistem.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nama_ruang" className="block text-sm font-medium text-gray-700 mb-2">
                                🏷️ Nama Ruang *
                            </label>
                            <input
                                type="text"
                                id="nama_ruang"
                                value={data.nama_ruang}
                                onChange={(e) => setData('nama_ruang', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan nama ruangan..."
                            />
                            {errors.nama_ruang && (
                                <p className="text-red-600 text-sm mt-1">{errors.nama_ruang}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-2">
                                📍 Lokasi *
                            </label>
                            <input
                                type="text"
                                id="lokasi"
                                value={data.lokasi}
                                onChange={(e) => setData('lokasi', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Contoh: Gedung A Lantai 2, Lab Komputer, dll..."
                            />
                            {errors.lokasi && (
                                <p className="text-red-600 text-sm mt-1">{errors.lokasi}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                            >
                                ← Kembali
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : '💾 Simpan Ruangan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}