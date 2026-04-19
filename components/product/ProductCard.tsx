'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BrandLogo } from '../shared/BrandLogo'
import { NewBadge } from '../shared/NewBadge'
import { formatPrice } from '@/lib/utils'
import type { ProductWithRelations } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'

export function ProductCard({ product }: { product: ProductWithRelations }) {
    const isOutOfStock = product.variants.length > 0 && product.variants.every(v => v.stock === 0)
    const images = (product.images as string[]) || []

    // Ensure we always have at least one image safely for fallback rendering
    const validImages = images.length > 0 ? images : ['https://placehold.co/400x533/f1f1f1/999?text=Görsel+Yok']
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <Link
            href={`/urun/${product.slug}`}
            className="group block relative border border-gray-800 hover:border-gray-500 transition-colors bg-[#111111] rounded-md overflow-hidden"
            onMouseLeave={() => setActiveIndex(0)} // Reset to primary image when not hovering
        >
            <div className="relative aspect-[3/4] w-full bg-[#0d0d0d] overflow-hidden">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={validImages[activeIndex]}
                            alt={`${product.name} - Görsel ${activeIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'opacity-70 grayscale' : ''}`}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Hover Zones: divide the width into N invisible columns */}
                {validImages.length > 1 && (
                    <div className="absolute inset-0 z-20 flex">
                        {validImages.map((_, i) => (
                            <div
                                key={i}
                                className="h-full flex-1"
                                onMouseEnter={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}

                {/* Golden Pagination Bars */}
                {validImages.length > 1 && (
                    <div className="absolute bottom-2 inset-x-2 z-30 flex items-center justify-center gap-1">
                        {validImages.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    width: activeIndex === i ? '20px' : '10px',
                                    backgroundColor: activeIndex === i ? '#C9A66B' : 'rgba(255,255,255,0.4)'
                                }}
                                transition={{ duration: 0.2 }}
                                className="h-[2px] rounded-full"
                            />
                        ))}
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 z-30 flex flex-col gap-1 items-start pointer-events-none">
                    <BrandLogo name={product.brand?.name || 'Diğer'} logoUrl={product.brand?.logoUrl} className="h-6 w-16 hover:scale-105 transition-transform" />
                </div>
                <div className="absolute top-2 right-2 z-30 pointer-events-none">
                    <NewBadge createdAt={product.createdAt} />
                </div>

                {/* Marquee Sale Tape */}
                {product.isOnSale && (
                    <div className="absolute inset-x-0 bottom-0 py-1 z-30 bg-red-600/90 overflow-hidden pointer-events-none border-t border-red-500/50 backdrop-blur-sm">
                        <motion.div
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="whitespace-nowrap flex items-center"
                        >
                            {Array.from({ length: 15 }).map((_, i) => (
                                <span key={i} className="text-[10px] font-black text-white uppercase mx-3 tracking-widest drop-shadow-sm flex items-center gap-2">
                                    İNDİRİM <span className="opacity-50 text-[8px]">●</span>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                )}

                {isOutOfStock && (
                    <div className="absolute inset-x-0 bottom-6 mx-auto h-8 w-24 bg-red-600 flex items-center justify-center rounded text-white font-semibold text-[10px] tracking-wider z-30 shadow-md pointer-events-none">
                        TÜKENDİ
                    </div>
                )}
            </div>

            <div className="p-3">
                <h3 className="text-sm font-medium text-white group-hover:text-[#C9A66B] transition-colors line-clamp-1">
                    {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                    {product.isOnSale && product.salePrice ? (
                        <>
                            <span className="text-sm font-bold text-[#C9A66B]">{formatPrice(product.salePrice)}</span>
                            <span className="text-xs text-gray-500 line-through">{formatPrice(product.basePrice)}</span>
                        </>
                    ) : (
                        <span className="text-sm font-semibold text-white">{formatPrice(product.basePrice)}</span>
                    )}
                </div>
            </div>
        </Link>
    )
}
