import React from 'react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export default async function LoglarimPage() {
    const session = await auth()

    const logs = await prisma.auditLog.findMany({
        where: { userId: session!.user!.id },
        orderBy: { createdAt: 'desc' },
        take: 50
    })

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-900 font-bold mb-6">İşlem Geçmişim</h1>

            {logs.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500 border border-dashed">
                    Henüz hesabınıza ait bir işlem kaydı yok.
                </div>
            ) : (
                <div className="border rounded-md overflow-hidden bg-white">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4 text-left font-medium border-b w-2/3">Aksiyon</th>
                                <th className="p-4 text-left font-medium border-b w-1/3">Tarih</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-700 font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{log.action}</td>
                                    <td className="p-4 text-gray-500 whitespace-nowrap">{log.createdAt.toLocaleString('tr-TR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
