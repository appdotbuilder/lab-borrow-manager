import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface Equipment {
    id: number;
    nama_alat: string;
    deskripsi: string;
    jumlah: number;
    kondisi: string;
    kategori: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    equipment: Equipment;
    [key: string]: unknown;
}

export default function ShowEquipment({ equipment }: Props) {
    const user = (window as { auth?: { user?: { role: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    const getKondisiColor = (kondisi: string) => {
        switch (kondisi) {
            case 'baik':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rusak':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'perbaikan':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getKondisiIcon = (kondisi: string) => {
        switch (kondisi) {
            case 'baik':
                return '✅';
            case 'rusak':
                return '❌';
            case 'perbaikan':
                return '🔧';
            default:
                return '❓';
        }
    };

    const canBorrow = equipment.kondisi === 'baik' && equipment.jumlah > 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus peralatan ini?')) {
            router.delete(route('equipment.destroy', equipment.id));
        }
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Heading title={`🛠️ ${equipment.nama_alat}`} />
                        <p className="text-gray-600 mt-1">Detail informasi peralatan</p>
                    </div>
                    <div className="flex gap-3">
                        {canBorrow && (
                            <Button onClick={() => router.visit(route('borrowing-requests.create'))}>
                                📤 Pinjam Alat Ini
                            </Button>
                        )}
                        {isAdmin && (
                            <>
                                <Button 
                                    variant="outline"
                                    onClick={() => router.visit(route('equipment.edit', equipment.id))}
                                >
                                    ✏️ Edit
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={handleDelete}
                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                    🗑️ Hapus
                                </Button>
                            </>
                        )}
                        <Button 
                            variant="outline"
                            onClick={() => router.visit(route('equipment.index'))}
                        >
                            ← Kembali ke Daftar
                        </Button>
                    </div>
                </div>

                {/* Equipment Card */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    {/* Header with Status */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{equipment.nama_alat}</h1>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        📂 {equipment.kategori}
                                    </span>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getKondisiColor(equipment.kondisi)}`}>
                                        {getKondisiIcon(equipment.kondisi)} {equipment.kondisi}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-gray-900">📦 {equipment.jumlah}</div>
                                <div className="text-sm text-gray-600">Unit Tersedia</div>
                            </div>
                        </div>

                        {/* Availability Status */}
                        {canBorrow ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="text-green-600 text-xl mr-3">✅</div>
                                    <div>
                                        <h3 className="text-green-800 font-medium">Tersedia untuk Dipinjam</h3>
                                        <p className="text-green-700 text-sm">
                                            {equipment.jumlah} unit dalam kondisi baik dan siap digunakan
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="text-red-600 text-xl mr-3">❌</div>
                                    <div>
                                        <h3 className="text-red-800 font-medium">Tidak Tersedia</h3>
                                        <p className="text-red-700 text-sm">
                                            {equipment.kondisi === 'baik' 
                                                ? 'Stok habis atau sedang dipinjam'
                                                : `Peralatan dalam kondisi ${equipment.kondisi}`
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Equipment Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Description */}
                            <div className="lg:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">📝 Deskripsi</h3>
                                <div className="prose text-gray-700">
                                    <p>{equipment.deskripsi}</p>
                                </div>
                            </div>

                            {/* Equipment Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">ℹ️ Informasi</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">📂 Kategori</span>
                                        <span className="font-medium text-gray-900">{equipment.kategori}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">📦 Jumlah</span>
                                        <span className="font-medium text-gray-900">{equipment.jumlah} unit</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">🔧 Kondisi</span>
                                        <span className={`px-2 py-1 rounded text-sm font-medium ${getKondisiColor(equipment.kondisi)}`}>
                                            {getKondisiIcon(equipment.kondisi)} {equipment.kondisi}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">📅 Ditambahkan</span>
                                        <span className="font-medium text-gray-900">{formatDate(equipment.created_at)}</span>
                                    </div>
                                    {equipment.updated_at !== equipment.created_at && (
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-600">🔄 Diperbarui</span>
                                            <span className="font-medium text-gray-900">{formatDate(equipment.updated_at)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    {canBorrow && (
                        <Button 
                            size="lg"
                            onClick={() => router.visit(route('borrowing-requests.create'))}
                            className="px-8"
                        >
                            📤 Ajukan Peminjaman
                        </Button>
                    )}
                    <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => router.visit(route('equipment.index'))}
                        className="px-8"
                    >
                        📋 Lihat Semua Peralatan
                    </Button>
                </div>
            </div>
        </AppShell>
    );
}