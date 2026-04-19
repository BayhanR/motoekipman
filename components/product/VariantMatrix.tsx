'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Variant {
    id?: string
    colorName: string
    colorHex: string
    size: string
    stock: number
    price: number
    salePrice?: number | null
}

interface VariantMatrixProps {
    variants: Variant[]
    onChange: (variants: Variant[]) => void
}

export function VariantMatrix({ variants = [], onChange }: VariantMatrixProps) {
    const [colorName, setColorName] = useState('')
    const [colorHex, setColorHex] = useState('#000000')
    const [size, setSize] = useState('')
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [salePrice, setSalePrice] = useState<number | ''>('')

    const handleAdd = () => {
        if (!colorName || !size || price <= 0) return
        const newVariant: Variant = {
            colorName,
            colorHex,
            size,
            stock,
            price,
            salePrice: salePrice === '' ? null : Number(salePrice),
        }
        onChange([...variants, newVariant])

        // reset some fields, keep color to speed up multiple size adding
        setSize('')
        setStock(0)
    }

    const handleRemove = (index: number) => {
        const updated = [...variants]
        updated.splice(index, 1)
        onChange(updated)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 items-end">
                <div>
                    <Label className="text-xs text-gray-500">Renk Adı</Label>
                    <Input value={colorName} onChange={e => setColorName(e.target.value)} placeholder="Örn: Siyah" />
                </div>
                <div>
                    <Label className="text-xs text-gray-500">Kodu</Label>
                    <div className="flex gap-2">
                        <Input type="color" value={colorHex} onChange={e => setColorHex(e.target.value)} className="w-full p-1 h-9 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <Label className="text-xs text-gray-500">Beden</Label>
                    <Input value={size} onChange={e => setSize(e.target.value)} placeholder="Örn: M" />
                </div>
                <div>
                    <Label className="text-xs text-gray-500">Stok</Label>
                    <Input type="number" min={0} value={stock} onChange={e => setStock(Number(e.target.value))} />
                </div>
                <div>
                    <Label className="text-xs text-gray-500">Fiyat (₺)</Label>
                    <Input type="number" min={0} step={0.01} value={price} onChange={e => setPrice(Number(e.target.value))} />
                </div>
                <div>
                    <Label className="text-xs text-gray-500">İnd. Fiyat (₺)</Label>
                    <Input type="number" min={0} step={0.01} value={salePrice} onChange={e => setSalePrice(e.target.value ? Number(e.target.value) : '')} placeholder="Ops." />
                </div>
                <div>
                    <Button type="button" onClick={handleAdd} className="w-full bg-[#111111] hover:bg-black text-white">Ekle</Button>
                </div>
            </div>

            {variants.length > 0 && (
                <div className="border rounded-md mt-4 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-3 text-left font-medium">Beden/Renk</th>
                                <th className="p-3 text-center font-medium">Stok</th>
                                <th className="p-3 text-right font-medium">Fiyat</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {variants.map((v, i) => (
                                <tr key={i} className="border-b last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-3 flex items-center gap-3">
                                        <span className="w-5 h-5 rounded-full border shadow-sm" style={{ backgroundColor: v.colorHex }} title={v.colorName} />
                                        <span className="font-semibold">{v.size}</span>
                                        <span className="text-xs text-gray-500">({v.colorName})</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={v.stock === 0 ? 'text-red-500 font-bold' : ''}>{v.stock}</span>
                                    </td>
                                    <td className="p-3 text-right">
                                        {v.salePrice ? (
                                            <span className="text-[#C9A66B] font-bold">{v.salePrice} ₺ <span className="text-xs text-gray-400 line-through block font-normal">{v.price} ₺</span></span>
                                        ) : (
                                            <span>{v.price} ₺</span>
                                        )}
                                    </td>
                                    <td className="p-3 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleRemove(i)} className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">Sil</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
