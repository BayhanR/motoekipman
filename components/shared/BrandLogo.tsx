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
    diger: 'png',
    mina: 'png'
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

    if (slug === 'diger' || slug === 'mina') {
        return (
            <div className={`relative overflow-hidden cursor-pointer ${className}`} title="Mina Giyim">
                <Image src="/images/brands/mina.png" alt="Mina Giyim" fill className="object-contain drop-shadow-md hover:scale-105 transition-all" />
            </div>
        )
    }

    if (!imgError) {
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

    return (
        <div className={`flex items-center justify-center bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-white rounded-sm px-2 ${className}`}>
            {name}
        </div>
    )
}
