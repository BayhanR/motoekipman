'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { logAction } from '@/lib/audit'
import { Role } from '@prisma/client'

export async function toggleFavorite(productId: string) {
    const session = await auth()
    if (!session?.user?.id) return { error: 'Lütfen giriş yapın.' }

    const userId = session.user.id

    const existing = await prisma.favorite.findUnique({
        where: { userId_productId: { userId, productId } }
    })

    if (existing) {
        await prisma.favorite.delete({ where: { id: existing.id } })
    } else {
        await prisma.favorite.create({ data: { userId, productId } })
    }

    revalidatePath(`/urun/${productId}`)
    revalidatePath('/hesabim/favorilerim')
    return { success: true }
}

export async function addStockSubscription(email: string, variantId: string) {
    await prisma.stockSubscription.upsert({
        where: { email_productVariantId: { email, productVariantId: variantId } },
        update: {},
        create: { email, productVariantId: variantId }
    })
    return { success: true }
}
