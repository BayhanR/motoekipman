import React from 'react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { ProductCard } from '@/components/product/ProductCard'

export default async function FavorilerimPage() {
    const session = await auth()

    const favorites = await prisma.favorite.findMany({
        where: { userId: session!.user!.id },
        include: {
            product: {
                include: { brand: true, variants: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-900 font-bold mb-6">Favorilerim</h1>

            {favorites.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500 border border-dashed">
                    Henüz favoriye eklediğiniz bir ürün bulunmuyor.
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(fav => (
                        <div key={fav.id} className="relative pt-3">
                            {fav.lastNotifiedPrice !== null && fav.product.salePrice !== null && (
                                <div className="absolute top-0 right-0 z-20 bg-[#C9A66B] text-black text-[10px] uppercase font-bold px-3 py-1 rounded shadow-md whitespace-nowrap">
                                    Fiyat Düştü!
                                </div>
                            )}
                            <ProductCard product={fav.product as any} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
