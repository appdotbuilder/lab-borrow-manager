import React from 'react';
import { router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';

interface Room {
    id: number;
    nama_ruang: string;
    lokasi: string;
    created_at: string;
}

interface PaginationData {
    data: Room[];
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
    rooms: PaginationData;
    [key: string]: unknown;
}

export default function RoomsIndex({ rooms }: Props) {
    const user = (window as { auth?: { user?: { role: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="🏠 Daftar Ruangan" />
                    <div className="flex gap-3">
                        {isAdmin && (
                            <Button onClick={() => router.visit(route('rooms.create'))}>
                                ➕ Tambah Ruangan
                            </Button>
                        )}
                        <Button 
                            variant="outline"
                            onClick={() => router.visit(route('dashboard'))}
                        >
                            🏠 Dashboard
                        </Button>
                    </div>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.data.map((room) => (
                        <div key={room.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {room.nama_ruang}
                                        </h3>
                                        <p className="text-gray-600 flex items-center gap-1">
                                            📍 {room.lokasi}
                                        </p>
                                    </div>
                                    <div className="text-2xl">🏠</div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Tersedia
                                    </span>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.visit(route('rooms.show', room.id))}
                                        >
                                            👁️ Detail
                                        </Button>
                                        {isAdmin && (
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => router.visit(route('rooms.edit', room.id))}
                                            >
                                                ✏️ Edit
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {rooms.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada ruangan</h3>
                        <p className="text-gray-500">
                            {isAdmin ? 'Tambahkan ruangan pertama Anda.' : 'Belum ada ruangan yang tersedia.'}
                        </p>
                        {isAdmin && (
                            <Button 
                                className="mt-4"
                                onClick={() => router.visit(route('rooms.create'))}
                            >
                                ➕ Tambah Ruangan Pertama
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {rooms.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white px-4 py-3 border rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span>Menampilkan</span>
                            <span className="font-medium">
                                {((rooms.current_page - 1) * rooms.per_page) + 1}
                            </span>
                            <span>sampai</span>
                            <span className="font-medium">
                                {Math.min(rooms.current_page * rooms.per_page, rooms.total)}
                            </span>
                            <span>dari</span>
                            <span className="font-medium">{rooms.total}</span>
                            <span>hasil</span>
                        </div>

                        <div className="flex gap-2">
                            {rooms.links.map((link, index) => (
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