'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
    items: { title: string; href: string; icon: React.ReactNode }[]
    title: string
}

export function Sidebar({ items, title }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4 bg-gray-50/50 hidden md:block">
            <h2 className="font-semibold text-lg mb-4 px-2">{title}</h2>
            <nav className="space-y-1">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors",
                            pathname === item.href ? "bg-gray-100 text-[#C9A66B]" : "text-gray-600"
                        )}
                    >
                        {item.icon}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
