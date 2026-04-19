import React from 'react'
import { getProduct } from '@/actions/product.actions'
import { notFound } from 'next/navigation'
import { ProductDetailsClient } from '@/components/product/ProductDetailsClient'
import { toggleFavorite } from '@/actions/favorite.actions'
import { Button } from '@/components/ui/button'

import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return {
            title: 'Ürün Bulunamadı | MotoEkipman2El'
        }
    }

    return {
        title: `${product.name} | MotoEkipman2.El`,
        description: product.description.substring(0, 160),
    }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProduct(slug)
    if (!product) notFound()

    const images = (product.images as string[]) || []

    const colorsMap = new Map<string, { colorHex: string, sizes: { size: string, stock: number }[] }>()
    product.variants.forEach(v => {
        if (!colorsMap.has(v.colorName)) {
            colorsMap.set(v.colorName, { colorHex: v.colorHex, sizes: [] })
        }
        colorsMap.get(v.colorName)!.sizes.push({ size: v.size, stock: v.stock })
    })

    const colors = Array.from(colorsMap.entries()).map(([name, data]) => ({ name, ...data }))

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 relative">
            <div className="absolute top-8 right-8 z-10 hidden md:block">
                <form action={async () => {
                    'use server';
                    await toggleFavorite(product.id)
                }}>
                    <Button type="submit" variant="outline" className="h-10 px-4 rounded-full bg-white/5 border-white/20 text-gray-200 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all font-medium tracking-wide">
                        ❤ Favorilere Ekle
                    </Button>
                </form>
            </div>
            <ProductDetailsClient product={product} colors={colors} images={images} />
        </div>
    )
}
