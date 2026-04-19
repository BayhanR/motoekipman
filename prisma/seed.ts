import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seed başlatılıyor...')

    // Temizlik
    await prisma.productVariant.deleteMany()
    await prisma.product.deleteMany()
    await prisma.brand.deleteMany()

    // Kategoriler Prisma Enum'dan çekilecek, ama Brands yazalım
    console.log('Markalar oluşturuluyor...')
    const brandAgv = await prisma.brand.create({
        data: { name: 'AGV', slug: 'agv' }
    })
    const brandDain = await prisma.brand.create({
        data: { name: 'Dainese', slug: 'dainese' }
    })
    const brandAlp = await prisma.brand.create({
        data: { name: 'Alpinestars', slug: 'alpinestars' }
    })
    const brandShoei = await prisma.brand.create({
        data: { name: 'Shoei', slug: 'shoei' }
    })

    console.log('Ürünler oluşturuluyor...')
    const p1 = await prisma.product.create({
        data: {
            name: 'AGV K6 Kapalı Kask Siyah',
            slug: 'agv-k6-kapali-kask-siyah',
            category: 'HELMETS',
            condition: 'LIKE_NEW',
            gender: 'UNISEX',
            helmetType: 'Full Face',
            material: 'Karbon-Aramid',
            basePrice: 12500,
            isOnSale: false,
            description: 'Sıfır ayarında AGV K6. Çiziksiz, temiz kullanılmış. Orijinal kutusu ile.',
            brandId: brandAgv.id,
            sizeType: 'LETTERED',
            images: ['/images/products/agv_k6_helmet.png'],
            variants: {
                create: [
                    { colorName: 'Mat Siyah', colorHex: '#222222', size: 'M', stock: 1, price: 12500 },
                    { colorName: 'Mat Siyah', colorHex: '#222222', size: 'L', stock: 1, price: 12500 }
                ]
            }
        }
    })

    const p2 = await prisma.product.create({
        data: {
            name: 'Dainese Racing 3 Deri Mont Siyah-Kırmızı',
            slug: 'dainese-racing-3-deri-mont-siyah-kirmizi',
            category: 'JACKETS',
            condition: 'GOOD',
            gender: 'MEN',
            season: 'Dört Mevsim',
            material: 'Deri',
            basePrice: 14000,
            isOnSale: true,
            salePrice: 12000,
            description: 'İkinci el temiz Dainese Racing 3 mont. Omuz sliderlarında ufak çizikler mevcut. Tüm korumaları eksiksiz.',
            brandId: brandDain.id,
            sizeType: 'NUMBERED',
            images: ['/images/products/dainese_jacket.png'],
            variants: {
                create: [
                    { colorName: 'Siyah Kırmızı', colorHex: '#EF4444', size: '52', stock: 1, price: 14000, salePrice: 12000 },
                    { colorName: 'Siyah Kırmızı', colorHex: '#EF4444', size: '54', stock: 0, price: 14000, salePrice: 12000 }
                ]
            }
        }
    })

    const p3 = await prisma.product.create({
        data: {
            name: 'Alpinestars SP-8 Deri Eldiven',
            slug: 'alpinestars-sp-8-deri-eldiven',
            category: 'GLOVES',
            condition: 'NEW',
            gender: 'UNISEX',
            season: 'Dört Mevsim',
            material: 'Deri',
            basePrice: 4200,
            isOnSale: false,
            description: 'Beden uymadığı için satılık. Hiç kullanılmadı, etiketleri üzerinde.',
            brandId: brandAlp.id,
            sizeType: 'LETTERED',
            images: ['/images/products/alpinestars_gloves.png'],
            variants: {
                create: [
                    { colorName: 'Siyah', colorHex: '#111111', size: 'L', stock: 1, price: 4200 }
                ]
            }
        }
    })

    console.log('Seed başarıyla tamamlandı!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
