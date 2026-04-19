'use client'

import React, { useState, useEffect, useTransition, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import { BrandLogo } from '@/components/shared/BrandLogo'

interface ProductFiltersProps {
    brands: { id: string, name: string, slug: string }[]
    options?: {
        colors: { name: string, hex: string }[]
        sizes: string[]
        categories?: string[]
        conditions?: string[]
        genders?: string[]
        helmetTypes?: string[]
    }
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

export function ProductFilters({ brands, options }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [priceRange, setPriceRange] = useState([0, 5000])
    const [isPending, startTransition] = useTransition()
    const isInitialMount = useRef(true)

    useEffect(() => {
        const min = searchParams.get('minP') ? Number(searchParams.get('minP')) : 0
        const max = searchParams.get('maxP') ? Number(searchParams.get('maxP')) : 5000
        setPriceRange([min, max])
    }, [searchParams])

    const toggleParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const current = params.getAll(key)
        if (current.includes(value)) {
            params.delete(key)
            current.filter(v => v !== value).forEach(v => params.append(key, v))
        } else {
            params.append(key, value)
        }
        params.set('page', '1')
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
            const container = document.getElementById('urunler')
            if (container) {
                const y = container.getBoundingClientRect().top + window.scrollY - 100
                window.scrollTo({ top: y, behavior: 'smooth' })
            }
        })
    }

    const applyPrice = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('minP', priceRange[0].toString())
        params.set('maxP', priceRange[1].toString())
        params.set('page', '1')
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
            const container = document.getElementById('urunler')
            if (container) {
                const y = container.getBoundingClientRect().top + window.scrollY - 100
                window.scrollTo({ top: y, behavior: 'smooth' })
            }
        })
    }

    return (
        <>
            {/* Global Loading Overlay for query transitions */}
            {isPending && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]/30 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-[#111] p-6 px-10 rounded-2xl border border-[#EF4444]/50 shadow-2xl flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-[3px] border-[#EF4444] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[#EF4444] font-bold text-xs tracking-[0.2em]">YÜKLENİYOR</span>
                    </div>
                </div>
            )}

            {/* Desktop Filters */}
            <div className={`hidden lg:block w-64 shrink-0 lg:pt-[4.5rem] transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="space-y-8">
                    {/* Sıralama */}
                    <div>
                        <h4 className="flex items-center h-[2.5rem] font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300 border-b border-gray-800 pb-4">Sıralama</h4>
                        <select
                            value={searchParams.get('sort') || 'newest'}
                            onChange={(e) => {
                                const params = new URLSearchParams(searchParams.toString())
                                params.set('sort', e.target.value)
                                params.set('page', '1')
                                startTransition(() => router.push(`?${params.toString()}`, { scroll: false }))
                            }}
                            className="w-full bg-[#111] border border-gray-800 rounded p-2.5 text-sm font-semibold text-gray-300 focus:border-[#EF4444] outline-none cursor-pointer hover:border-gray-500 transition-colors"
                        >
                            <option value="newest">En Yeniler (Öne Çıkan)</option>
                            <option value="price-asc">Fiyata Göre Artan</option>
                            <option value="price-desc">Fiyata Göre Azalan</option>
                            <option value="oldest">En Eskiler</option>
                        </select>
                    </div>

                    {/* Brands */}
                    <div>
                        <h4 className="flex items-center h-[2.5rem] font-semibold text-xs mb-8 uppercase tracking-wider text-gray-300 border-b border-gray-800 pb-4">Markalar</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {brands.map(b => {
                                const isSelected = searchParams.getAll('brand').includes(b.slug || b.name)
                                return (
                                    <button
                                        key={b.id}
                                        onClick={() => toggleParam('brand', b.slug || b.name)}
                                        className={`relative h-12 rounded-md border flex items-center justify-center p-2 transition-all bg-white cursor-pointer ${isSelected ? 'ring-2 ring-[#EF4444] border-transparent scale-105' : 'border-gray-800 hover:border-gray-500 hover:scale-105'}`}
                                        title={b.name}
                                    >
                                        <BrandLogo name={b.name} className="w-full h-full" />
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Motorcycle Categories via Generic Checkboxes */}
                    {options?.categories && options.categories.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Kategori</h4>
                            <div className="flex flex-col gap-2">
                                {options.categories.map(cat => {
                                    const isSelected = searchParams.getAll('category').includes(cat)
                                    return (
                                        <div key={cat} className="flex items-center space-x-2">
                                            <Checkbox id={`cat-${cat}`} checked={isSelected} onCheckedChange={() => toggleParam('category', cat)} />
                                            <Label htmlFor={`cat-${cat}`} className="text-sm text-gray-300 font-medium cursor-pointer">{cat}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {options?.conditions && options.conditions.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Durum</h4>
                            <div className="flex flex-col gap-2">
                                {options.conditions.map(cond => {
                                    const isSelected = searchParams.getAll('condition').includes(cond)
                                    return (
                                        <div key={cond} className="flex items-center space-x-2">
                                            <Checkbox id={`cond-${cond}`} checked={isSelected} onCheckedChange={() => toggleParam('condition', cond)} />
                                            <Label htmlFor={`cond-${cond}`} className="text-sm text-gray-300 font-medium cursor-pointer">{cond}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {options?.genders && options.genders.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Cinsiyet</h4>
                            <div className="flex flex-col gap-2">
                                {options.genders.map(gen => {
                                    const isSelected = searchParams.getAll('gender').includes(gen)
                                    return (
                                        <div key={gen} className="flex items-center space-x-2">
                                            <Checkbox id={`gen-${gen}`} checked={isSelected} onCheckedChange={() => toggleParam('gender', gen)} />
                                            <Label htmlFor={`gen-${gen}`} className="text-sm text-gray-300 font-medium cursor-pointer">{gen}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {options?.helmetTypes && options.helmetTypes.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Kask Tipi</h4>
                            <div className="flex flex-col gap-2">
                                {options.helmetTypes.map(ht => {
                                    const isSelected = searchParams.getAll('helmetType').includes(ht)
                                    return (
                                        <div key={ht} className="flex items-center space-x-2">
                                            <Checkbox id={`ht-${ht}`} checked={isSelected} onCheckedChange={() => toggleParam('helmetType', ht)} />
                                            <Label htmlFor={`ht-${ht}`} className="text-sm text-gray-300 font-medium cursor-pointer">{ht}</Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Colors */}
                    {options?.colors && options.colors.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Renk</h4>
                            <div className="flex flex-wrap gap-2">
                                {options.colors.map(c => {
                                    const isSelected = searchParams.getAll('color').includes(c.name)
                                    return (
                                        <button
                                            key={`desktop-color-${c.name}`}
                                            onClick={() => toggleParam('color', c.name)}
                                            className={`w-8 h-8 rounded-full border-2 ${isSelected ? 'border-white ring-2 ring-[#EF4444] ring-offset-2 ring-offset-[#070707]' : 'border-gray-700/50 hover:scale-110'} transition-all`}
                                            style={{ backgroundColor: c.hex }}
                                            title={c.name}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {options?.sizes && options.sizes.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Beden</h4>
                            <div className="flex flex-wrap gap-2">
                                {options.sizes.map(s => {
                                    const isSelected = searchParams.getAll('size').includes(s)
                                    return (
                                        <button
                                            key={`desktop-size-${s}`}
                                            onClick={() => toggleParam('size', s)}
                                            className={`h-10 px-3 min-w-[2.5rem] rounded border flex items-center justify-center text-xs transition-colors ${isSelected ? 'bg-[#EF4444] border-[#EF4444] text-black font-bold' : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'}`}
                                        >
                                            {s}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Price */}
                    <div>
                        <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-gray-300">Fiyat Aralığı</h4>
                        <Slider
                            value={priceRange}
                            min={0}
                            max={10000}
                            step={100}
                            onValueChange={(val) => setPriceRange(val as number[])}
                            className={`mb-4 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
                        />
                        <div className="flex items-center space-x-2 mt-4">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">Min (₺)</label>
                                <input
                                    type="number"
                                    className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm text-gray-300 focus:border-[#EF4444] outline-none transition-colors"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase text-gray-500 font-bold mb-1 block">Max (₺)</label>
                                <input
                                    type="number"
                                    className="w-full bg-[#111] border border-gray-800 rounded p-2 text-sm text-gray-300 focus:border-[#EF4444] outline-none transition-colors"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={applyPrice}
                            className="w-full mt-4 h-10 bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-black border border-[#EF4444]/50 transition-all font-bold tracking-wide"
                        >
                            Fiyatı Uygula
                        </Button>
                    </div>

                    {/* Sale Toggle: Premium Styled Switch */}
                    <div className="border-t border-gray-800 pt-8 pb-4">
                        <label className="relative flex items-center justify-between cursor-pointer group bg-[#111111] p-4 rounded-xl border border-gray-800 hover:border-[#EF4444]/50 transition-all">
                            <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                                Sadece İndirimdekiler
                            </span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={searchParams.get('sale') === 'true'}
                                    onChange={(e) => {
                                        const params = new URLSearchParams(searchParams.toString())
                                        if (e.target.checked) params.set('sale', 'true')
                                        else params.delete('sale')
                                        params.set('page', '1')
                                        startTransition(() => router.push(`?${params.toString()}`, { scroll: false }))
                                    }}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EF4444]"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Mobile Filters */}
            <div className={`lg:hidden w-full mb-8 space-y-6 transition-opacity duration-300 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <h4 className="font-semibold text-xs mb-3 uppercase tracking-wider text-gray-300 text-center">Filtreler</h4>
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
                        {brands.map(b => {
                            const isSelected = searchParams.getAll('brand').includes(b.slug || b.name)
                            return (
                                <button
                                    key={`mobile-${b.id}`}
                                    onClick={() => toggleParam('brand', b.slug || b.name)}
                                    className={`snap-center shrink-0 w-24 h-12 rounded-md border flex items-center justify-center p-2 transition-all bg-white cursor-pointer ${isSelected ? 'ring-2 ring-[#EF4444] border-transparent scale-105' : 'border-gray-800 hover:border-gray-500'}`}
                                >
                                    <img
                                        src={`/images/brands/${b.slug === 'diger' ? 'mina' : b.slug}.${BRAND_LOGO_EXT[b.slug] || 'png'}`}
                                        alt={b.name}
                                        className="object-contain w-full h-full mix-blend-multiply opacity-90"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            if (e.currentTarget.parentElement) {
                                                e.currentTarget.parentElement.innerHTML = `<span class="text-[10px] text-black font-bold uppercase truncate px-1">${b.name}</span>`
                                            }
                                        }}
                                    />
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="pt-2">
                    <label className="relative flex items-center justify-between cursor-pointer group bg-[#111111] p-4 rounded-xl border border-gray-800 hover:border-[#EF4444]/50 transition-all shadow-sm">
                        <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white transition-colors">
                            Sadece İndirimdekiler
                        </span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={searchParams.get('sale') === 'true'}
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams.toString())
                                    if (e.target.checked) params.set('sale', 'true')
                                    else params.delete('sale')
                                    params.set('page', '1')
                                    startTransition(() => router.push(`?${params.toString()}`, { scroll: false }))
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A66B]"></div>
                        </div>
                    </label>
                </div>
            </div>
        </>
    )
}
