'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function getDashboardStats() {
    const [totalProducts, outOfStock, totalUsers, recentLogs] = await Promise.all([
        prisma.product.count(),
        prisma.productVariant.count({ where: { stock: 0 } }),
        prisma.user.count(),
        prisma.auditLog.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: true } })
    ])
    return { totalProducts, outOfStock, totalUsers, recentLogs }
}

export async function createProduct(data: any) {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
        throw new Error('Unauthorized');
    }

    const {
        name, brandId, description, basePrice, isOnSale, salePrice,
        sizeType, images, category, condition, gender, helmetType,
        certification, material, season, variants
    } = data;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

    const product = await prisma.product.create({
        data: {
            name,
            slug,
            brandId,
            description,
            basePrice: Number(basePrice),
            isOnSale: Boolean(isOnSale),
            salePrice: salePrice ? Number(salePrice) : null,
            sizeType,
            images,
            category: category || 'HELMETS',
            condition: condition || 'USED',
            gender: gender || 'UNISEX',
            helmetType: helmetType || null,
            certification: certification || null,
            material: material || null,
            season: season || null,
            variants: {
                create: variants.map((v: any) => ({
                    colorName: v.colorName,
                    colorHex: v.colorHex || '#000000',
                    size: v.size,
                    stock: Number(v.stock),
                    price: Number(basePrice),
                    salePrice: salePrice ? Number(salePrice) : null,
                }))
            }
        }
    });

    return { success: true, productId: product.id };
}
