import React from 'react'
import { prisma } from '@/lib/prisma'

export default async function AdminAbonelerPage() {
    const subs = await prisma.stockSubscription.findMany({
        include: { variant: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 className="text-2xl font-black italic tracking-tighter text-[#EF4444] mb-6 uppercase">Stok Haberci Aboneleri</h1>

            <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-sm">
                    <thead className="bg-black/50 border-b border-gray-800">
                        <tr>
                            <th className="p-4 text-left font-bold text-xs uppercase tracking-widest text-gray-500">E-posta</th>
                            <th className="p-4 text-left font-bold text-xs uppercase tracking-widest text-gray-500">Beklenen Ürün / Varyant</th>
                            <th className="p-4 text-left font-bold text-xs uppercase tracking-widest text-gray-500">Kayıt Tarihi</th>
                            <th className="p-4 text-left font-bold text-xs uppercase tracking-widest text-gray-500">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {subs.map(s => (
                            <tr key={s.id} className="border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="p-4 font-bold text-white">{s.email}</td>
                                <td className="p-4 text-gray-400">{s.variant.product.name} ({s.variant.size} - {s.variant.colorName})</td>
                                <td className="p-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString('tr-TR')}</td>
                                <td className="p-4">
                                    {s.notifiedAt ? (
                                        <span className="text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase">Gönderildi</span>
                                    ) : (
                                        <span className="text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase">Bekliyor</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {subs.length === 0 && (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-600 italic">Kayıtlı abone bulunamadı.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
