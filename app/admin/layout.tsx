import React from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] bg-gray-50 border-none m-0 p-0">
            <AdminSidebar />
            <div className="flex-1 p-6 md:p-10 overflow-auto">
                {children}
            </div>
        </div>
    )
}
