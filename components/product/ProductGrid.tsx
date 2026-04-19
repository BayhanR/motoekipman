'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductCard } from './ProductCard'
import type { ProductWithRelations } from '@/types'

export function ProductGrid({ products }: { products: ProductWithRelations[] }) {
    if (!products || products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center min-h-[300px] bg-[#111] border border-gray-800 rounded-lg shadow-xl"
            >
                <p className="text-[#C9A66B] font-semibold tracking-widest text-sm uppercase">Bu kriterlere uygun ürün bulunamadı.</p>
            </motion.div >
        )
    }

    return (
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
                {products.map((product) => (
                    <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scaleY: 1.5, scaleX: 0.5, y: 100, filter: "blur(15px)" }}
                        animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scaleY: 2.5, scaleX: 0.1, y: 150, filter: "blur(25px)" }}
                        transition={{
                            layout: { type: "spring", stiffness: 350, damping: 30 },
                            opacity: { duration: 0.25 },
                            default: { duration: 0.45, ease: "backInOut" }
                        }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}
