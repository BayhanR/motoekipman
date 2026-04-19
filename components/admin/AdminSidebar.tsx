'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard, ShoppingBag, Tags,
    Users, Image as ImageIcon, Activity, Bell
} from 'lucide-react'

export function AdminSidebar() {
    const pathname = usePathname()

    const items = [
        { title: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
        { title: 'Ürünler', href: '/admin/urunler', icon: <ShoppingBag className="w-5 h-5" /> },
        { title: 'Markalar', href: '/admin/markalar', icon: <Tags className="w-5 h-5" /> },
        { title: 'Kampanyalar', href: '/admin/kampanya', icon: <ImageIcon className="w-5 h-5" /> },
        { title: 'Kullanıcılar', href: '/admin/kullanicilar', icon: <Users className="w-5 h-5" /> },
        { title: 'Aboneler', href: '/admin/aboneler', icon: <Bell className="w-5 h-5" /> },
        { title: 'Sistem Logları', href: '/admin/loglar', icon: <Activity className="w-5 h-5" /> },
    ]

    return (
        <aside className="w-64 bg-[#070707] text-white flex flex-col shrink-0 hidden md:flex min-h-screen border-r border-gray-800">
            <div className="p-6">
                <h2 className="text-xl font-black italic tracking-tighter text-[#EF4444]">YÖNETİM<span className="text-gray-500 text-sm ml-1 uppercase font-bold tracking-widest not-italic">Paneli</span></h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {items.map(item => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-widest",
                                isActive ? "bg-[#EF4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                            )}
                        >
                            {item.icon}
                            {item.title}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
