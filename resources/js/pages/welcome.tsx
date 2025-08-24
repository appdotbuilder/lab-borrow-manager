import React from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    stats?: {
        totalEquipment: number;
        availableEquipment: number;
        totalRooms: number;
        totalRequests: number;
    };
    featuredEquipment?: Array<{
        id: number;
        nama_alat: string;
        kategori: string;
        kondisi: string;
    }>;
    featuredRooms?: Array<{
        id: number;
        nama_ruang: string;
        lokasi: string;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ stats, featuredEquipment, featuredRooms }: Props) {
    const handleLogin = () => {
        router.visit(route('login'));
    };

    const handleRegister = () => {
        router.visit(route('register'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        🏢 Sistem Peminjaman Alat & Ruang
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Platform digital yang memudahkan peminjaman peralatan dan ruangan di institusi Anda. 
                        Kelola dengan efisien, pantau dengan mudah, dan tingkatkan produktivitas tim.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button 
                            size="lg" 
                            onClick={handleLogin}
                            className="px-8 py-3"
                        >
                            🔑 Masuk
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={handleRegister}
                            className="px-8 py-3"
                        >
                            📝 Daftar
                        </Button>
                    </div>
                </div>

                {/* Stats Section */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-2">🛠️</div>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalEquipment}</div>
                            <div className="text-gray-600">Total Peralatan</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-green-600">{stats.availableEquipment}</div>
                            <div className="text-gray-600">Tersedia</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-2">🏠</div>
                            <div className="text-2xl font-bold text-purple-600">{stats.totalRooms}</div>
                            <div className="text-gray-600">Total Ruangan</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-2">📋</div>
                            <div className="text-2xl font-bold text-orange-600">{stats.totalRequests}</div>
                            <div className="text-gray-600">Total Peminjaman</div>
                        </div>
                    </div>
                )}

                {/* Features Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Fitur Utama</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl">🔍</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Pencarian & Filter</h3>
                                    <p className="text-gray-600">Temukan peralatan dan ruangan dengan mudah menggunakan sistem pencarian yang canggih.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📅</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Manajemen Jadwal</h3>
                                    <p className="text-gray-600">Atur tanggal peminjaman dan pengembalian dengan sistem kalender yang terintegrasi.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-2xl">⚡</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Persetujuan Cepat</h3>
                                    <p className="text-gray-600">Sistem persetujuan otomatis untuk mempercepat proses peminjaman.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📊</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Laporan & Analytics</h3>
                                    <p className="text-gray-600">Dashboard dan laporan lengkap untuk monitoring penggunaan aset.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Items */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔥 Item Populer</h2>
                        
                        {featuredEquipment && featuredEquipment.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Peralatan Tersedia</h3>
                                <div className="space-y-3">
                                    {featuredEquipment.slice(0, 3).map((item) => (
                                        <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 border">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{item.nama_alat}</h4>
                                                    <p className="text-sm text-gray-600">{item.kategori}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.kondisi === 'baik' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {item.kondisi}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {featuredRooms && featuredRooms.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ruangan Tersedia</h3>
                                <div className="space-y-3">
                                    {featuredRooms.slice(0, 3).map((room) => (
                                        <div key={room.id} className="bg-white rounded-lg shadow-sm p-4 border">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{room.nama_ruang}</h4>
                                                    <p className="text-sm text-gray-600">📍 {room.lokasi}</p>
                                                </div>
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Tersedia
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-white rounded-2xl shadow-lg p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        🚀 Siap Memulai?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan pengguna yang telah mempercayai sistem kami untuk mengelola aset dan ruangan mereka.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button 
                            size="lg" 
                            onClick={handleLogin}
                            className="px-8 py-4 text-lg"
                        >
                            🔑 Masuk Sekarang
                        </Button>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={handleRegister}
                            className="px-8 py-4 text-lg"
                        >
                            📝 Daftar Gratis
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Sistem Peminjaman Alat & Ruang. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}