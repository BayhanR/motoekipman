'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, User, Menu, Search, X, ShoppingCart, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar({ isAdmin }: { isAdmin?: boolean }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/urunler?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#070707]/90 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 md:h-24">
                <div className="h-full grid grid-cols-3 items-center relative">
                    {/* Sol: Menü ve Navigasyon */}
                    <div className={`flex items-center gap-6 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <Button variant="ghost" size="icon" className="md:hidden text-white">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-widest uppercase text-gray-400">
                            <Link href="/urunler" className="hover:text-white transition-colors">Tüm İlanlar</Link>
                            <Link href="/urunler?condition=NEW" className="hover:text-white transition-colors">SIFIR GİBİ</Link>
                            <Link href="/urunler?sale=true" className="hover:text-white transition-colors flex items-center gap-1">İndirim <span className="text-red-500 text-[10px] ml-0.5">●</span></Link>
                            <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
                        </nav>
                    </div>

                    {/* Orta: Logo */}
                    <div className={`flex justify-center items-center relative transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <Link href="/" className="flex items-center justify-center transition-transform hover:scale-105 duration-300 z-50">
                            <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-[#EF4444]">MOTO<span className="text-gray-200">EKİPMAN</span><span className="text-lg text-gray-500 ml-1">2EL</span></span>
                        </Link>
                    </div>

                    {/* Sağ: İkonlar & Arama Inputu */}
                    <div className="flex items-center justify-end gap-2 md:gap-4 relative w-full">
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 w-[250px] md:w-[400px] flex items-center z-50 animate-in fade-in slide-in-from-right-10 duration-300">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Ürün, marka veya kategori ara..."
                                    className="w-full bg-[#111111] border border-gray-700 text-white rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-[#C9A66B] transition-colors pr-12"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 text-gray-400 hover:text-white">
                                    <X className="h-4 w-4" />
                                </button>
                            </form>
                        ) : (
                            <>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => setIsSearchOpen(true)}>
                                    <Search className="h-5 w-5" />
                                </Button>
                                {isAdmin ? (
                                    <Button variant="outline" asChild className="hidden md:flex bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] transition-all duration-300 ml-2 h-9 px-4">
                                        <Link href="/admin" className="flex items-center gap-2 text-xs font-bold tracking-widest">
                                            <LayoutDashboard className="h-3.5 w-3.5" />
                                            YÖNETİM
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
                                        <Link href="/hesabim/sepet">
                                            <ShoppingCart className="h-5 w-5" />
                                        </Link>
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">

                                    <Link href="/hesabim/favorilerim">
                                        <Heart className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
                                    <Link href="/hesabim">
                                        <User className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
