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
        <aside className="w-64 bg-[#111111] text-white flex flex-col shrink-0 hidden md:flex min-h-screen">
            <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-[#C9A66B]">Yönetim Paneli</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {items.map(item => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin')
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium text-sm",
                                isActive ? "bg-[#C9A66B] text-black" : "text-gray-300 hover:bg-gray-800"
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
