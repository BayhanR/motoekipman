import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminUrunDuzenlePage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <h1 className="text-2xl font-bold font-serif text-gray-900">Ürün Düzenle #{params.id}</h1>
                <Button variant="outline" asChild>
                    <Link href="/admin/urunler">İptal</Link>
                </Button>
            </div>

            <div className="bg-white p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="text-gray-500 max-w-md mx-auto">
                    Düzenleme formu modülü entegrasyonu aşamasında.
                </p>
            </div>
        </div>
    )
}
