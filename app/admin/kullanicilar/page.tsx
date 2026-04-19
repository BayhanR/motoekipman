import React from 'react'
import { prisma } from '@/lib/prisma'

export default async function AdminKullanicilarPage() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif mb-6 text-gray-900">Kullanıcı Yönetimi</h1>

            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left font-medium text-gray-600">Ad Soyad</th>
                            <th className="p-4 text-left font-medium text-gray-600">E-Posta</th>
                            <th className="p-4 text-left font-medium text-gray-600">Yetki Rolü</th>
                            <th className="p-4 text-left font-medium text-gray-600">Kayıt Tarihi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{u.name || '-'}</td>
                                <td className="p-4 text-gray-600">{u.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${u.role === 'SUPERADMIN' ? 'bg-purple-100 text-purple-700' : u.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString('tr-TR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
