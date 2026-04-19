import React from 'react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default async function BildirimlerimPage() {
    const session = await auth()

    const subscriptions = await prisma.stockSubscription.findMany({
        where: { email: session!.user!.email! },
        include: {
            variant: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-900 font-bold mb-6">Stok Bildirimlerim</h1>

            {subscriptions.length === 0 ? (
                <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500 border border-dashed">
                    Stok takibi yaptığınız bir ürün bulunmuyor.
                </div>
            ) : (
                <div className="space-y-4">
                    {subscriptions.map(sub => (
                        <div key={sub.id} className="bg-white p-4 lg:p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{sub.variant.product.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Renk: {sub.variant.colorName} | Beden: {sub.variant.size}
                                </p>
                                {sub.notifiedAt ? (
                                    <span className="inline-block mt-2 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">Stokta (Bildirim Gönderildi)</span>
                                ) : (
                                    <span className="inline-block mt-2 text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded">Stok Bekleniyor</span>
                                )}
                            </div>
                            <div className="text-right">
                                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">İptal Et</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
