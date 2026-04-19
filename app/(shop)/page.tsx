import React from 'react'
import { getProducts, getActiveCampaignBanner, getBrands, getFilterOptions } from '@/actions/product.actions'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { HeroSlider } from '@/components/home/HeroSlider'
import { TURKISH_MONTHS } from '@/lib/utils'
import Image from 'next/image'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
    const resolvedParams = await searchParams
    const [products, banner, brands, filterOptions] = await Promise.all([
        getProducts(resolvedParams),
        getActiveCampaignBanner(),
        getBrands(),
        getFilterOptions()
    ])

    const hasFilters = Object.keys(resolvedParams).some(k => ['brand', 'sale', 'minP', 'maxP', 'color', 'size', 'category', 'condition', 'gender', 'helmetType'].includes(k))
    const title = hasFilters ? 'Filtreye Uygun Ürünler' : 'Tüm Ürünler'

    return (
        <div className="min-h-screen bg-transparent">
            {/* Hero Banner Slayt */}
            <HeroSlider />

            {/* Main Content */}
            <div id="urunler" className="container mx-auto px-4 py-8 md:py-16 flex flex-col lg:flex-row gap-8">
                <ProductFilters brands={brands} options={filterOptions} />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800 h-[2.5rem]">
                        <h2 className="text-2xl font-serif font-semibold text-white leading-none">{title}</h2>
                        <span className="text-sm font-medium text-gray-300 bg-gray-800 px-3 py-1 rounded-full">{products.length} Ürün</span>
                    </div>
                    <ProductGrid products={products as any} />
                </div>
            </div>
        </div>
    )
}
