import React from 'react'
import { getDashboardStats } from '@/actions/admin.actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, AlertCircle, Users, Activity } from 'lucide-react'

export default async function AdminDashboard() {
    const stats = await getDashboardStats()

    return (
        <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Özet Bilgiler</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Toplam Ürün</CardTitle>
                        <Package className="w-4 h-4 text-[#C9A66B]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Tükenen Stok</CardTitle>
                        <AlertCircle className="w-4 h-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Kayıtlı Kullanıcı</CardTitle>
                        <Users className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm border-gray-200">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="text-lg">Son Sistem Hareketleri</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {stats.recentLogs.map(log => (
                            <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <Activity className="w-8 h-8 p-1.5 bg-gray-100 rounded-full text-gray-500" />
                                    <div>
                                        <p className="font-semibold text-sm text-gray-900">{log.action}</p>
                                        <p className="text-xs text-gray-500">{log.entity} #{log.entityId} — {log.user?.name || log.user?.email}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {log.createdAt.toLocaleString('tr-TR')}
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
