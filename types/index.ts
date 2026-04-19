import { Prisma } from '@prisma/client'

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        brand: true
        variants: true
    }
}>

export type CartItem = {
    variantId: string
    productId: string
    name: string
    color: string
    size: string
    price: number
    quantity: number
    image: string
}
