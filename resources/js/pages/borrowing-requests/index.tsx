import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Equipment {
    id: number;
    nama_alat: string;
    kategori: string;
}

interface Room {
    id: number;
    nama_ruang: string;
    lokasi: string;
}

interface BorrowingRequest {
    id: number;
    item_type: string;
    status: string;
    jumlah: number;
    tanggal_peminjaman: string;
    tanggal_kembali: string;
    keterangan?: string;
    created_at: string;
    user?: User;
    equipment?: Equipment;
    room?: Room;
}

interface PaginationData {
    data: BorrowingRequest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    borrowingRequests: PaginationData;
    [key: string]: unknown;
}

export default function BorrowingRequestsIndex({ borrowingRequests }: Props) {
    const user = (window as { auth?: { user?: { role: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'returned':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'approved':
                return '✅';
            case 'rejected':
                return '❌';
            case 'returned':
                return '🔄';
            default:
                return '❓';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu Persetujuan';
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title={`📋 ${isAdmin ? 'Semua Permintaan' : 'Riwayat Peminjaman'}`} />
                    <div className="flex gap-3">
                        <Button onClick={() => router.visit(route('borrowing-requests.create'))}>
                            ➕ Ajukan Peminjaman
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => router.visit(route('dashboard'))}
                        >
                            🏠 Dashboard
                        </Button>
                    </div>
                </div>

                {/* Filter Tabs (for admin) */}
                {isAdmin && (
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                        <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">
                            📋 Semua
                        </button>
                        <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900">
                            ⏳ Menunggu
                        </button>
                        <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900">
                            ✅ Disetujui
                        </button>
                        <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900">
                            ❌ Ditolak
                        </button>
                    </div>
                )}

                {/* Requests List */}
                <div className="space-y-4">
                    {borrowingRequests.data.map((request) => (
                        <div key={request.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xl">
                                                {request.item_type === 'equipment' ? '🛠️' : '🏠'}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {request.item_type === 'equipment'
                                                    ? request.equipment?.nama_alat || 'Peralatan'
                                                    : request.room?.nama_ruang || 'Ruangan'
                                                }
                                            </h3>
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                                {getStatusIcon(request.status)} {getStatusLabel(request.status)}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                            {isAdmin && request.user && (
                                                <div className="flex items-center gap-2">
                                                    <span>👤</span>
                                                    <span>{request.user.name}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span>📅</span>
                                                <span>{formatDate(request.tanggal_peminjaman)} - {formatDate(request.tanggal_kembali)}</span>
                                            </div>
                                            {request.item_type === 'equipment' && (
                                                <div className="flex items-center gap-2">
                                                    <span>📦</span>
                                                    <span>{request.jumlah} unit</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span>⏰</span>
                                                <span>Diajukan {formatDate(request.created_at)}</span>
                                            </div>
                                        </div>

                                        {request.keterangan && (
                                            <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                                <span className="text-sm text-gray-600">📝 {request.keterangan}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 ml-4">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.visit(route('borrowing-requests.show', request.id))}
                                        >
                                            👁️ Detail
                                        </Button>
                                        {isAdmin && request.status === 'pending' && (
                                            <>
                                                <Button 
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={() => router.patch(route('borrowing-requests.update', request.id), { status: 'approved' })}
                                                >
                                                    ✅ Setujui
                                                </Button>
                                                <Button 
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                    onClick={() => router.patch(route('borrowing-requests.update', request.id), { status: 'rejected' })}
                                                >
                                                    ❌ Tolak
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {borrowingRequests.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {isAdmin ? 'Belum ada permintaan peminjaman' : 'Anda belum pernah mengajukan peminjaman'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {isAdmin 
                                ? 'Permintaan peminjaman dari pengguna akan muncul di sini.'
                                : 'Ajukan peminjaman pertama Anda untuk alat atau ruangan.'
                            }
                        </p>
                        <Button onClick={() => router.visit(route('borrowing-requests.create'))}>
                            ➕ Ajukan Peminjaman Pertama
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {borrowingRequests.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white px-4 py-3 border rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span>Menampilkan</span>
                            <span className="font-medium">
                                {((borrowingRequests.current_page - 1) * borrowingRequests.per_page) + 1}
                            </span>
                            <span>sampai</span>
                            <span className="font-medium">
                                {Math.min(borrowingRequests.current_page * borrowingRequests.per_page, borrowingRequests.total)}
                            </span>
                            <span>dari</span>
                            <span className="font-medium">{borrowingRequests.total}</span>
                            <span>hasil</span>
                        </div>

                        <div className="flex gap-2">
                            {borrowingRequests.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? "default" : "outline"}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}