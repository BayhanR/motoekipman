'use client'

import React from 'react'

export function AuditLogTable({ logs }: { logs: any[] }) {
    if (!logs || logs.length === 0) return <div className="p-8 text-center text-gray-500 bg-white border rounded-md">Kayıt bulunamadı.</div>

    return (
        <div className="border rounded-md bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 text-left font-semibold text-gray-600">Tarih</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Kullanıcı</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Aksiyon</th>
                        <th className="p-4 text-left font-semibold text-gray-600">İlgili Birim (Entity)</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 text-gray-500">{new Date(log.createdAt).toLocaleString('tr-TR')}</td>
                            <td className="p-4 text-gray-900">{log.user?.email || 'Sistem Otomatiği'}</td>
                            <td className="p-4 font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block mt-3 ml-4">{log.action}</td>
                            <td className="p-4 text-gray-500">{log.entity} #{log.entityId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
