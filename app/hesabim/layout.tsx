import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { User, Heart, Bell, ActivitySquare, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth'

export default function HesabimLayout({ children }: { children: React.ReactNode }) {
    const sidebarItems = [
        { title: 'Profilim', href: '/hesabim', icon: <User className="w-4 h-4" /> },
        { title: 'Favorilerim', href: '/hesabim/favorilerim', icon: <Heart className="w-4 h-4" /> },
        { title: 'Bildirimlerim', href: '/hesabim/bildirimlerim', icon: <Bell className="w-4 h-4" /> },
        { title: 'İşlem Geçmişim', href: '/hesabim/loglarim', icon: <ActivitySquare className="w-4 h-4" /> },
    ]

    return (
        <div className="flex container mx-auto px-4 py-8 max-w-7xl">
            <Sidebar items={sidebarItems} title="Hesabım" />
            <div className="flex-1 px-4 md:px-8">
                {children}
            </div>
        </div>
    )
}
