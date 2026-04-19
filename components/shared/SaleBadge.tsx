import React from 'react'
import { Badge } from '@/components/ui/badge'

export function SaleBadge({ isOnSale, className = '' }: { isOnSale: boolean, className?: string }) {
    if (!isOnSale) return null

    return (
        <Badge className={`bg-red-600 text-white hover:bg-red-700 font-semibold text-[10px] px-2 py-0.5 uppercase tracking-wider absolute top-2 left-2 z-10 ${className}`}>
            İNDİRİM
        </Badge>
    )
}
