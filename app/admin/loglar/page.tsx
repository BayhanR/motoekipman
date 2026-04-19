import React from 'react'
import { prisma } from '@/lib/prisma'
import { AuditLogTable } from '@/components/admin/AuditLogTable'

export default async function AdminLoglarPage() {
    const logs = await prisma.auditLog.findMany({
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 100
    })

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif text-gray-900 mb-6">Sistem Logları</h1>
            <p className="text-sm text-gray-500 mb-6">Tüm kritik model değişiklikleri, ürün ekleme ve fiyatlandırma aksiyonları burada tutulur. (Son 100 Kayıt)</p>

            <AuditLogTable logs={logs} />
        </div>
    )
}
