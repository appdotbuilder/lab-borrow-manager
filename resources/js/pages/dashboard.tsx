import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface BorrowingRequest {
    id: number;
    item_type: string;
    status: string;
    tanggal_peminjaman: string;
    tanggal_kembali: string;
    user?: {
        id: number;
        name: string;
    };
    equipment?: {
        id: number;
        nama_alat: string;
    };
    room?: {
        id: number;
        nama_ruang: string;
    };
}

interface Props {
    stats: {
        totalEquipment: number;
        availableEquipment: number;
        totalRooms: number;
        totalRequests: number;
        pendingRequests?: number;
        myRequests?: number;
        myPendingRequests?: number;
    };
    recentRequests: BorrowingRequest[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentRequests }: Props) {
    const user = (window as { auth?: { user?: { role: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'returned':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu';
            case 'approved':
                return 'Disetujui';
            case 'rejected':
                return 'Ditolak';
            case 'returned':
                return 'Dikembalikan';
            default:
                return status;
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="🏠 Dashboard" />
                    <div className="flex gap-3">
                        <Button onClick={() => router.visit(route('equipment.index'))}>
                            🛠️ Lihat Alat
                        </Button>
                        <Button onClick={() => router.visit(route('rooms.index'))}>
                            🏠 Lihat Ruang
                        </Button>
                        <Button onClick={() => router.visit(route('borrowing-requests.create'))}>
                            ➕ Ajukan Peminjaman
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🛠️</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Peralatan</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Tersedia</p>
                                <p className="text-2xl font-bold text-green-600">{stats.availableEquipment}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🏠</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Ruangan</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.totalRooms}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">{isAdmin ? '⏳' : '📋'}</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {isAdmin ? 'Menunggu Persetujuan' : 'Peminjaman Saya'}
                                </p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {isAdmin ? stats.pendingRequests : stats.myRequests}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Requests */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                📋 {isAdmin ? 'Peminjaman Terbaru' : 'Riwayat Peminjaman Anda'}
                            </h2>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.visit(route('borrowing-requests.index'))}
                            >
                                Lihat Semua
                            </Button>
                        </div>
                    </div>
                    <div className="p-6">
                        {recentRequests && recentRequests.length > 0 ? (
                            <div className="space-y-4">
                                {recentRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-lg">
                                                    {request.item_type === 'equipment' ? '🛠️' : '🏠'}
                                                </span>
                                                <h3 className="font-medium text-gray-900">
                                                    {request.item_type === 'equipment' 
                                                        ? request.equipment?.nama_alat || 'Peralatan'
                                                        : request.room?.nama_ruang || 'Ruangan'
                                                    }
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                {isAdmin && request.user && (
                                                    <span>👤 {request.user.name}</span>
                                                )}
                                                <span>📅 {request.tanggal_peminjaman} - {request.tanggal_kembali}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {getStatusLabel(request.status)}
                                            </span>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => router.visit(route('borrowing-requests.show', request.id))}
                                            >
                                                Detail
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">📋</div>
                                <p className="text-gray-500">Belum ada peminjaman</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                        <div className="text-3xl mb-3">🔍</div>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Jelajahi Peralatan</h3>
                        <p className="text-blue-700 mb-4 text-sm">Lihat daftar lengkap peralatan yang tersedia untuk dipinjam</p>
                        <Button 
                            variant="outline" 
                            className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                            onClick={() => router.visit(route('equipment.index'))}
                        >
                            Lihat Peralatan
                        </Button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                        <div className="text-3xl mb-3">🏠</div>
                        <h3 className="text-lg font-semibold text-purple-900 mb-2">Jelajahi Ruangan</h3>
                        <p className="text-purple-700 mb-4 text-sm">Temukan ruangan yang sesuai dengan kebutuhan Anda</p>
                        <Button 
                            variant="outline" 
                            className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                            onClick={() => router.visit(route('rooms.index'))}
                        >
                            Lihat Ruangan
                        </Button>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                        <div className="text-3xl mb-3">➕</div>
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Ajukan Peminjaman</h3>
                        <p className="text-green-700 mb-4 text-sm">Buat permintaan peminjaman baru untuk alat atau ruangan</p>
                        <Button 
                            variant="outline" 
                            className="w-full border-green-300 text-green-700 hover:bg-green-100"
                            onClick={() => router.visit(route('borrowing-requests.create'))}
                        >
                            Buat Permintaan
                        </Button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}