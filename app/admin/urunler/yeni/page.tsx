import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getBrands, getFilterOptions } from '@/actions/product.actions'
import { ProductForm } from '@/components/admin/ProductForm'

export default async function AdminUrunlerYeniPage() {
    const [brands, filterOptions] = await Promise.all([
        getBrands(),
        getFilterOptions()
    ])

    return (
        <div className="max-w-4xl mx-auto py-6">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
                <h1 className="text-2xl font-bold font-serif text-gray-900">Yeni Ürün Ekle</h1>
                <Button variant="outline" asChild className="border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-white">
                    <Link href="/admin/urunler">Listeye Dön</Link>
                </Button>
            </div>

            <ProductForm brands={brands} filterOptions={filterOptions} />
        </div>
    )
}
