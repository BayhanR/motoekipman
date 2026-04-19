import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminUrunlerPage() {
    const products = await prisma.product.findMany({
        include: { brand: true, variants: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold font-serif text-gray-900">Ürün Yönetimi</h1>
                <Button asChild className="bg-[#111111] hover:bg-black text-white">
                    <Link href="/admin/urunler/yeni"><Plus className="w-4 h-4 mr-2" /> Yeni Ürün</Link>
                </Button>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left font-medium text-gray-600">Ürün Adı</th>
                            <th className="p-4 text-left font-medium text-gray-600">Marka</th>
                            <th className="p-4 text-center font-medium text-gray-600">Stok (Varyant)</th>
                            <th className="p-4 text-left font-medium text-gray-600">Fiyat</th>
                            <th className="p-4 text-right font-medium text-gray-600">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-semibold text-gray-900">{p.name}</td>
                                <td className="p-4 text-gray-500">{p.brand.name}</td>
                                <td className="p-4 text-center text-gray-500">{p.variants.reduce((acc, v) => acc + v.stock, 0)} ({p.variants.length})</td>
                                <td className="p-4 font-semibold text-gray-900">{p.basePrice} ₺</td>
                                <td className="p-4 text-right">
                                    <Button variant="outline" size="sm" asChild className="hover:bg-gray-100">
                                        <Link href={`/admin/urunler/${p.id}/duzenle`}>Düzenle</Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Kayıtlı ürün bulunamadı.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
