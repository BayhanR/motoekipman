import React from 'react'
import { getDashboardStats } from '@/actions/admin.actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, AlertCircle, Users, Activity } from 'lucide-react'

export default async function AdminDashboard() {
    const stats = await getDashboardStats()

    return (
        <div className="max-w-6xl">
            <h1 className="text-3xl font-black italic tracking-tighter text-[#EF4444] mb-8 uppercase">Özet <span className="text-gray-400 not-italic font-bold tracking-widest text-xl ml-2">Bilgiler</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-[#111] border-gray-800 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">Toplam Ürün</CardTitle>
                        <Package className="w-4 h-4 text-[#EF4444]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic tracking-tighter text-white">{stats.totalProducts}</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#111] border-gray-800 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tükenen Stok</CardTitle>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic tracking-tighter text-red-600">{stats.outOfStock}</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#111] border-gray-800 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-gray-500">Kayıtlı Kullanıcı</CardTitle>
                        <Users className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic tracking-tighter text-white">{stats.totalUsers}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#111] border-gray-800 shadow-2xl">
                <CardHeader className="border-b border-gray-800 bg-black/40">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-[#EF4444]">Son Sistem Hareketleri</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {stats.recentLogs.map(log => (
                            <div key={log.id} className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <Activity className="w-10 h-10 p-2.5 bg-black rounded-full text-[#EF4444] border border-gray-800" />
                                    <div>
                                        <p className="font-bold text-sm text-white uppercase tracking-tight">{log.action}</p>
                                        <p className="text-xs text-gray-500">{log.entity} #{log.entityId} — {log.user?.name || log.user?.email}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                    {new Date(log.createdAt).toLocaleString('tr-TR')}
                                </div>
                            </div>
                        ))}
                        {stats.recentLogs.length === 0 && (
                            <div className="text-sm text-gray-500 italic">Daha önce bir hareket yaşanmadı.</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
