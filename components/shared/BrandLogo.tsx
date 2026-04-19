'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface BrandLogoProps {
    name: string
    logoUrl?: string | null
    className?: string
}

const BRAND_LOGO_EXT: Record<string, string> = {
    alvina: 'webp',
    armine: 'webp',
    levidor: 'webp',
    tugba: 'avif',
    nihan: 'png',
    vena: 'avif',
    zuhre: 'svg',
    diger: 'png'
}

export function BrandLogo({ name, logoUrl, className = '' }: BrandLogoProps) {
    const [imgError, setImgError] = useState(false)
    const slug = name
        .replace(/İ/g, 'i')
        .replace(/I/g, 'i')
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    if (slug === 'diger' || slug === 'mina' || slug === 'moto-ekipman-2el' || imgError) {
        return (
            <div className={`flex flex-col items-center justify-center bg-black/40 border border-gray-800 rounded-lg p-2 ${className}`} title="MotoEkipman2.El">
                <span className="text-[10px] md:text-[12px] font-black italic tracking-tighter text-[#EF4444] leading-none uppercase">MOTO</span>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 leading-none tracking-widest uppercase">EKİPMAN</span>
            </div>
        )
    }

    const url = logoUrl || `/images/brands/${slug}.${BRAND_LOGO_EXT[slug] || 'png'}`
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={url}
                alt={name}
                fill
                className="object-contain drop-shadow-md"
                onError={() => setImgError(true)}
            />
        </div>
    )
}
