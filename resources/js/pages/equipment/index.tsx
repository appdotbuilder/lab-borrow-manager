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
}

interface PaginationData {
    data: Equipment[];
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
    equipment: PaginationData;
    [key: string]: unknown;
}

export default function EquipmentIndex({ equipment }: Props) {
    const user = (window as { auth?: { user?: { role: string } } }).auth?.user;
    const isAdmin = user?.role === 'admin';

    const getKondisiColor = (kondisi: string) => {
        switch (kondisi) {
            case 'baik':
                return 'bg-green-100 text-green-800';
            case 'rusak':
                return 'bg-red-100 text-red-800';
            case 'perbaikan':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
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

    return (
        <AppShell>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="🛠️ Daftar Peralatan" />
                    <div className="flex gap-3">
                        {isAdmin && (
                            <Button onClick={() => router.visit(route('equipment.create'))}>
                                ➕ Tambah Alat
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

                {/* Equipment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {equipment.data.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {item.nama_alat}
                                        </h3>
                                        <p className="text-sm text-blue-600 font-medium mb-2">
                                            📂 {item.kategori}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getKondisiIcon(item.kondisi)}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKondisiColor(item.kondisi)}`}>
                                            {item.kondisi}
                                        </span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {item.deskripsi}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            📦 Jumlah: {item.jumlah}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.visit(route('equipment.show', item.id))}
                                        >
                                            👁️ Detail
                                        </Button>
                                        {isAdmin && (
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => router.visit(route('equipment.edit', item.id))}
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
                {equipment.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛠️</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada peralatan</h3>
                        <p className="text-gray-500">
                            {isAdmin ? 'Tambahkan peralatan pertama Anda.' : 'Belum ada peralatan yang tersedia.'}
                        </p>
                        {isAdmin && (
                            <Button 
                                className="mt-4"
                                onClick={() => router.visit(route('equipment.create'))}
                            >
                                ➕ Tambah Alat Pertama
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {equipment.last_page > 1 && (
                    <div className="flex items-center justify-between bg-white px-4 py-3 border rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span>Menampilkan</span>
                            <span className="font-medium">
                                {((equipment.current_page - 1) * equipment.per_page) + 1}
                            </span>
                            <span>sampai</span>
                            <span className="font-medium">
                                {Math.min(equipment.current_page * equipment.per_page, equipment.total)}
                            </span>
                            <span>dari</span>
                            <span className="font-medium">{equipment.total}</span>
                            <span>hasil</span>
                        </div>

                        <div className="flex gap-2">
                            {equipment.links.map((link, index) => (
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