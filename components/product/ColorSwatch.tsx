import React from 'react'
import { cn } from '@/lib/utils'

interface ColorSwatchProps {
    colorHex: string
    colorName: string
    selected?: boolean
    onClick?: () => void
}

export function ColorSwatch({ colorHex, colorName, selected, onClick }: ColorSwatchProps) {
    return (
        <button
            onClick={onClick}
            title={colorName}
            className={cn(
                "w-8 h-8 rounded-full border border-gray-200 focus:outline-none transition-all outline-offset-2",
                selected ? "outline outline-2 outline-[#C9A66B] shadow-sm transform scale-105" : "hover:border-gray-400"
            )}
            style={{ backgroundColor: colorHex }}
            aria-label={`Renk seç: ${colorName}`}
        />
    )
}
