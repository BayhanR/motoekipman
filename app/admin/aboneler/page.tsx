import React from 'react'
import { prisma } from '@/lib/prisma'

export default async function AdminAbonelerPage() {
    const subs = await prisma.stockSubscription.findMany({
        include: { variant: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif text-gray-900 mb-6">Stok Haberci Aboneleri</h1>

            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left font-medium text-gray-600">E-posta</th>
                            <th className="p-4 text-left font-medium text-gray-600">Beklenen Ürün / Varyant</th>
                            <th className="p-4 text-left font-medium text-gray-600">Kayıt Tarihi</th>
                            <th className="p-4 text-left font-medium text-gray-600">Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subs.map(s => (
                            <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-medium">{s.email}</td>
                                <td className="p-4 text-gray-600">{s.variant.product.name} ({s.variant.size} - {s.variant.colorName})</td>
                                <td className="p-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4">
                                    {s.notifiedAt ? (
                                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-semibold">Gönderildi</span>
                                    ) : (
                                        <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded text-xs font-semibold">Bekliyor</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {subs.length === 0 && (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">Kayıtlı abone bulunamadı.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
