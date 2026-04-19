'use server'

import { prisma } from '@/lib/prisma'
import { sendPriceDropEmail, sendStockAvailableEmail } from '@/lib/resend'

export async function notifyPriceDrop(productId: string, newPrice: number) {
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { favorites: { include: { user: true } } }
    })

    if (!product) return

    const oldPrice = product.basePrice // Simplified

    for (const fav of product.favorites) {
        if (fav.user?.email && (!fav.lastNotifiedPrice || fav.lastNotifiedPrice !== newPrice)) {
            if (process.env.RESEND_API_KEY) {
                await sendPriceDropEmail(fav.user.email, product.name, oldPrice, newPrice, product.slug)
            }
            await prisma.favorite.update({
                where: { id: fav.id },
                data: { lastNotifiedPrice: newPrice }
            })
        }
    }
}

export async function notifyStockAvailable(variantId: string) {
    const variant = await prisma.productVariant.findUnique({
        where: { id: variantId },
        include: {
            product: true,
            subscriptions: { where: { notifiedAt: null } }
        }
    })

    if (!variant || variant.stock === 0) return

    for (const sub of variant.subscriptions) {
        if (process.env.RESEND_API_KEY) {
            await sendStockAvailableEmail(sub.email, variant.product.name, variant.colorName, variant.size, variant.product.slug)
        }
        await prisma.stockSubscription.update({
            where: { id: sub.id },
            data: { notifiedAt: new Date() }
        })
    }
}
