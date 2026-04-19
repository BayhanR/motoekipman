import React from 'react'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminKampanyaPage() {
    const campaigns = await prisma.campaignBanner.findMany({ orderBy: { createdAt: 'desc' } })

    async function activateCampaign(formData: FormData) {
        'use server'
        const id = formData.get('id') as string
        if (!id) return
        await prisma.campaignBanner.updateMany({ data: { isActive: false } })
        await prisma.campaignBanner.update({ where: { id }, data: { isActive: true } })
        revalidatePath('/')
        revalidatePath('/admin/kampanya')
    }

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif mb-6 text-gray-900">Kampanya Yönetimi</h1>

            <div className="bg-gray-50 border p-6 rounded-lg mb-8 shadow-sm">
                <h2 className="font-semibold mb-4 text-gray-700">Not</h2>
                <p className="text-sm text-gray-500">Ana sayfadaki dev banner'ı yönetmek için aşağıdan bir kampanyayı "Aktif Yap" seçeneğiyle aktifleştirebilirsiniz. Sadece bir adet aktif kampanya olabilir. Yeni kampanya ekleme modülü yakında devrede.</p>
            </div>

            <div className="grid gap-4">
                {campaigns.map(c => (
                    <div key={c.id} className={`p-6 border rounded-lg shadow-sm relative transition-all ${c.isActive ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'bg-white hover:border-gray-400'}`}>
                        <h3 className="font-bold text-xl mb-1">{c.title} <span className="text-sm font-normal text-gray-500">({c.month}/{c.year})</span></h3>
                        <p className="text-gray-600 mb-4">{c.subtitle}</p>

                        {!c.isActive && (
                            <form action={activateCampaign}>
                                <input type="hidden" name="id" value={c.id} />
                                <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                                    Ana Sayfada Aktif Yap
                                </button>
                            </form>
                        )}
                        {c.isActive && (
                            <span className="absolute top-4 right-4 bg-green-100 text-green-700 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-sm">
                                Aktif Kampanya
                            </span>
                        )}
                    </div>
                ))}
                {campaigns.length === 0 && (
                    <div className="p-8 text-center bg-white border border-dashed rounded-lg text-gray-500">
                        Kayıtlı kampanya bulunamadı. Lütfen Seed scriptini çalıştırdığınızdan emin olun.
                    </div>
                )}
            </div>
        </div>
    )
}
