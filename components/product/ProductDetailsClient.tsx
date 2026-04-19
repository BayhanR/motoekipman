'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { SizeSelector } from './SizeSelector'
import { BrandLogo } from '../shared/BrandLogo'
import { ColorSwatch } from './ColorSwatch'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

interface ProductProps {
    product: any
    colors: { name: string, colorHex: string, sizes: { size: string, stock: number }[] }[]
    images: string[]
}

export function ProductDetailsClient({ product, colors, images }: ProductProps) {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.name)
    const [selectedSize, setSelectedSize] = useState('')
    const [mainImage, setMainImage] = useState(images[0] || 'https://placehold.co/400x533/f1f1f1/999?text=Gorsel+Yok')

    const currentColorData = colors.find(c => c.name === selectedColor)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full border rounded-lg overflow-hidden bg-gray-50">
                    <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
                </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 tracking-wide">{product.name}</h1>
                    <div className="bg-white px-4 py-2 rounded-md inline-flex items-center justify-center mb-2 shadow-lg ring-1 ring-white/20">
                        <BrandLogo name={product.brand?.name || 'Diğer'} logoUrl={product.brand?.logoUrl} className="h-8 w-24 object-contain brightness-0 hover:scale-105 transition-transform" />
                    </div>
                </div>

                <div className="text-2xl font-semibold flex items-center gap-3">
                    {product.isOnSale && product.salePrice ? (
                        <>
                            <span className="text-[#C9A66B]">{formatPrice(product.salePrice)}</span>
                            <span className="text-lg text-gray-400 line-through">{formatPrice(product.basePrice)}</span>
                        </>
                    ) : (
                        <span>{formatPrice(product.basePrice)}</span>
                    )}
                </div>

                <div>
                    <h3 className="font-medium text-sm mb-3">Renk Seçenekleri</h3>
                    <div className="flex gap-3">
                        {colors.map(c => (
                            <ColorSwatch
                                key={c.name}
                                colorName={c.name}
                                colorHex={c.colorHex}
                                selected={selectedColor === c.name}
                                onClick={() => {
                                    setSelectedColor(c.name)
                                    setSelectedSize('')
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-sm mb-3">Beden</h3>
                    <SizeSelector
                        sizes={currentColorData?.sizes || []}
                        selectedSize={selectedSize}
                        onSelect={setSelectedSize}
                    />
                </div>

                <div className="pt-6 border-t border-gray-800 flex flex-col gap-3">
                    <Button
                        className={`w-full h-14 text-lg font-bold tracking-widest uppercase transition-all duration-300 ${selectedSize ? 'bg-[#C9A66B] hover:bg-[#daba8b] text-black shadow-[0_0_20px_rgba(201,166,107,0.3)] hover:scale-[1.02]' : 'bg-[#111111] text-gray-500 cursor-not-allowed border-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'}`}
                        disabled={!selectedSize}
                        onClick={() => alert('Sepete eklendi! (Demo)')}
                    >
                        {selectedSize ? 'Sepete Ekle' : 'Lütfen Beden Seçiniz'}
                    </Button>

                    {currentColorData?.sizes.every(s => s.stock === 0) && (
                        <Button variant="outline" className="w-full h-12 text-[#C9A66B] border-[#C9A66B] hover:bg-[#C9A66B]/10">
                            Stokta Yoksa Bildir
                        </Button>
                    )}
                </div>

                <div className="pt-6 border-t border-gray-800">
                    <h3 className="font-semibold text-white mb-3 text-lg">Ürün Açıklaması</h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
                    {product.material && (
                        <p className="text-sm mt-4 text-gray-300"><strong>Kumaş:</strong> {product.material}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
