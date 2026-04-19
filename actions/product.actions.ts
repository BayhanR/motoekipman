'use server'

import { prisma } from '@/lib/prisma'

export async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
    const { brand, minP, maxP, sale, color, size, category, condition, gender, helmetType, q, sort } = searchParams

    const where: any = {}

    if (q) {
        const query = String(q)
        // Global textual search block inside AND to avoid overriding other OR scopes (like Brand OR)
        where.AND = [
            {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { category: { contains: query, mode: 'insensitive' } }
                ]
            }
        ]
    }

    if (brand) {
        const brandList = Array.isArray(brand) ? brand : [brand]
        where.brand = {
            OR: [
                { slug: { in: brandList as string[] } },
                { name: { in: brandList as string[] } }
            ]
        }
    }

    if (minP || maxP) {
        where.basePrice = {}
        if (minP) where.basePrice.gte = Number(minP)
        if (maxP) where.basePrice.lte = Number(maxP)
    }

    if (sale === 'true') {
        where.isOnSale = true
    }

    // Motorcycle Fields
    if (category) where.category = { in: Array.isArray(category) ? category : [category] }
    if (condition) where.condition = { in: Array.isArray(condition) ? condition : [condition] }
    if (gender) where.gender = { in: Array.isArray(gender) ? gender : [gender] }
    if (helmetType) where.helmetType = { in: Array.isArray(helmetType) ? helmetType : [helmetType] }

    if (color || size) {
        where.variants = { some: {} }
        if (color) {
            where.variants.some.colorName = { in: Array.isArray(color) ? color : [color] }
        }
        if (size) {
            where.variants.some.size = { in: Array.isArray(size) ? size : [size] }
        }
    }

    let orderBy: any = { createdAt: 'desc' }
    switch (sort) {
        case 'price-asc':
            orderBy = { basePrice: 'asc' }
            break
        case 'price-desc':
            orderBy = { basePrice: 'desc' }
            break
        case 'oldest':
            orderBy = { createdAt: 'asc' }
            break
        case 'newest':
            orderBy = { createdAt: 'desc' }
            break
        default:
            orderBy = { createdAt: 'desc' } // Öne Çıkanlar equivalent
            break
    }

    const products = await prisma.product.findMany({
        where,
        include: { brand: true, variants: true },
        orderBy,
        take: 40 // simple pagination limit for now
    })

    return products
}

export async function getProduct(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
        include: { brand: true, variants: true }
    })
}

export async function getBrands() {
    return prisma.brand.findMany({
        orderBy: { name: 'asc' }
    })
}

export async function getActiveCampaignBanner() {
    return prisma.campaignBanner.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
    })
}

export async function getFilterOptions() {
    const products = await prisma.product.findMany({
        select: { category: true, condition: true, gender: true, helmetType: true },
        distinct: ['category', 'condition', 'gender', 'helmetType']
    });

    const getUnique = (key: keyof typeof products[0]) =>
        Array.from(new Set(products.map(p => p[key]).filter(Boolean)));

    const variants = await prisma.productVariant.findMany({
        select: { colorName: true, colorHex: true, size: true }
    });

    const uniqueColors = Array.from(new Set(variants.map(v => v.colorName))).map(name => ({
        name,
        hex: variants.find(v => v.colorName === name)?.colorHex || '#000'
    }));

    const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Standart']
    const dbSizes = new Set(variants.map(v => v.size))
    const uniqueSizes = Array.from(new Set([...standardSizes, ...dbSizes])).filter(Boolean);

    return {
        colors: uniqueColors,
        sizes: uniqueSizes,
        categories: getUnique('category') as string[],
        conditions: getUnique('condition') as string[],
        genders: getUnique('gender') as string[],
        helmetTypes: getUnique('helmetType') as string[]
    };
}
