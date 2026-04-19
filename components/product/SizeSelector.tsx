import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SizeSelectorProps {
    sizes: { size: string, stock: number }[]
    selectedSize?: string
    onSelect: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
    if (!sizes || sizes.length === 0) return null

    return (
        <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
                const isOutOfStock = s.stock === 0
                const isSelected = selectedSize === s.size

                return (
                    <Button
                        key={s.size}
                        variant={isSelected ? "default" : "outline"}
                        disabled={isOutOfStock}
                        onClick={() => onSelect(s.size)}
                        className={cn(
                            "w-12 h-10 p-0 rounded-md font-medium text-sm transition-all relative overflow-hidden ring-offset-1 focus-visible:ring-1 focus-visible:ring-[#C9A66B]",
                            isSelected ? "bg-[#C9A66B] text-black border-transparent shadow-[0_0_10px_rgba(201,166,107,0.4)]" : "border-gray-800 bg-transparent text-gray-300 hover:bg-white/5",
                            isOutOfStock && "opacity-50 cursor-not-allowed bg-gray-50/10 text-gray-500 hover:bg-gray-50/10"
                        )}
                    >
                        {s.size}
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[140%] h-[1px] bg-gray-300 rotate-45 transform origin-center" />
                            </div>
                        )}
                    </Button>
                )
            })}
        </div>
    )
}
