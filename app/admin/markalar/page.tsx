import React from 'react'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminMarkalarPage() {
    const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } })

    async function addBrand(formData: FormData) {
        'use server'
        const name = formData.get('name') as string
        if (!name) return
        const slug = name.toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/i̇/g, 'i')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

        await prisma.brand.create({ data: { name, slug } })
        revalidatePath('/admin/markalar')
    }

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif mb-6 text-gray-900">Markalar</h1>

            <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
                <h2 className="font-semibold text-gray-800 mb-4">Yeni Marka Ekle</h2>
                <form action={addBrand} className="flex gap-4 max-w-md">
                    <input name="name" placeholder="Örn: Alvina" required className="border p-2 flex-1 rounded bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C9A66B]" />
                    <button className="bg-[#111111] hover:bg-black text-white px-6 py-2 rounded font-medium transition-colors">Ekle</button>
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {brands.map(b => (
                    <div key={b.id} className="p-4 border border-gray-200 bg-white shadow-sm rounded-lg flex items-center justify-center font-medium text-gray-700 hover:border-[#C9A66B] transition-colors cursor-default">
                        {b.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
