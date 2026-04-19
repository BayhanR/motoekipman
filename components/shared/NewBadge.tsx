import React from 'react'
import { Badge } from '@/components/ui/badge'
import { isNew } from '@/lib/utils'

export function NewBadge({ createdAt, className = '' }: { createdAt: Date | string, className?: string }) {
    if (!isNew(createdAt)) return null

    return (
        <Badge className={`bg-[#C9A66B] text-black hover:bg-[#b09055] font-semibold text-[10px] px-2 py-0.5 uppercase tracking-wider absolute top-2 right-2 z-10 ${className}`}>
            YENİ
        </Badge>
    )
}
