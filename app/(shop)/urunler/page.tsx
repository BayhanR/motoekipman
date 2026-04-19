import React from 'react'
import { getProducts, getBrands } from '@/actions/product.actions'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function UrunlerPage({ searchParams }: { searchParams: SearchParams }) {
    const resolvedParams = await searchParams
    const [products, brands] = await Promise.all([
        getProducts(resolvedParams),
        getBrands()
    ])

    return (
        <div className="min-h-[80vh] bg-transparent pt-8">
            <div id="urunler" className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                <ProductFilters brands={brands} />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                        <h1 className="text-3xl font-serif font-bold text-white">Koleksiyon</h1>
                        <span className="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-full">{products.length} Ürün</span>
                    </div>
                    <ProductGrid products={products as any} />
                </div>
            </div>
        </div>
    )
}
