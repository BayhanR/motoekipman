const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'prisma/seed.ts');
let content = fs.readFileSync(file, 'utf8');

// Mıknatıslı Hazır Şal
content = content.replace(
    /name:\s*'Mıknatıslı Hazır Şal'[\s\S]*?images:\s*\['\/images\/products\/shawl_flowing_\d+\.png'\]/,
    match => match.replace(/shawl_flowing_\d+\.png/, 'shawl_magnetic_1775305179078.png')
);

// Beli Büzgülü Kap
content = content.replace(
    /name:\s*'Beli Büzgülü Kap'[\s\S]*?images:\s*\['\/images\/products\/outerwear_trench_autumn_\d+\.png'\]/,
    match => match.replace(/outerwear_trench_autumn_\d+\.png/, 'outerwear_kap_1775305148285.png')
);

// Deri Detaylı Pardesü
content = content.replace(
    /name:\s*'Deri Detaylı Pardesü'[\s\S]*?images:\s*\['\/images\/products\/outerwear_wool_winter_\d+\.png'\]/,
    match => match.replace(/outerwear_wool_winter_\d+\.png/, 'outerwear_leather_detail_1775305163253.png')
);

// İpek Karışımlı Şal
content = content.replace(
    /name:\s*'İpek Karışımlı Şal'[\s\S]*?images:\s*\['\/images\/products\/hijab_closeup_\d+\.png'\]/,
    match => match.replace(/hijab_closeup_\d+\.png/, 'hijab_silk_blend_1775305194513.png')
);

// Taşlı Bone
content = content.replace(
    /name:\s*'Taşlı Bone'[\s\S]*?images:\s*\['\/images\/products\/hijab_closeup_\d+\.png'\]/,
    match => match.replace(/hijab_closeup_\d+\.png/, 'accessories_stone_bone_1775305214221.png')
);

// Balon Kollu Tunik
content = content.replace(
    /name:\s*'Balon Kollu Tunik'[\s\S]*?images:\s*\['\/images\/products\/topwear_oversized_tunic_\d+\.png'\]/,
    match => match.replace(/topwear_oversized_tunic_\d+\.png/, 'topwear_balloon_sleeve_1775305227147.png')
);

// Modern Kesim Spor Pardesü
content = content.replace(
    /name:\s*'Modern Kesim Spor Pardesü'[\s\S]*?images:\s*\['\/images\/products\/sportswear_athleisure_\d+\.png'\]/,
    match => match.replace(/sportswear_athleisure_\d+\.png/, 'sportswear_modern_pardesu_1775305245506.png')
);

// Add missing products to the end of the array
const newProducts = `    {
      brandSlug: 'diger',
      name: 'Kuşaklı Çanta Kombini',
      slug: 'kusakli-canta-kombini',
      description: 'Zarif elbise üzeri tasarım kuşak ve çanta uyumu.',
      basePrice: 1350,
      isOnSale: false,
      images: ['/images/products/accessories_belt_bag_1775305266367.png'],
      sizeType: SizeType.CUSTOM,
      category: Category.ACCESSORIES, coverageLevel: null, length: null, fit: null, occasion: Occasion.DAILY, pieceCount: null,
      variants: [
        { colorName: 'Kahverengi', colorHex: '#8b4513', size: 'Standart', stock: 15 },
      ]
    },
    {
      brandSlug: 'alvina',
      name: 'Tam Kapsamalı Namaz Elbisesi',
      slug: 'tam-kapsamali-namaz-elbisesi',
      description: 'Huzur ve rahatlık için tasarlanmış, tam tesettür sağlayan namaz elbisesi.',
      basePrice: 950,
      isOnSale: false,
      images: ['/images/products/prayer_wear_full_1775305279378.png'],
      sizeType: SizeType.LETTERED,
      category: Category.PRAYER_WEAR, coverageLevel: CoverageLevel.FULLY_COVERED, length: ProductLength.MAXI, fit: FitType.OVERSIZE, occasion: Occasion.PRAYER, pieceCount: 1,
      variants: [
        { colorName: 'Gül Kurusu', colorHex: '#a95c68', size: 'M', stock: 30 },
      ]
    },
    {
      brandSlug: 'zuhre',
      name: 'Yumuşak Kumaş Namazlık',
      slug: 'yumusak-kumas-namazlik',
      description: 'Nefes alan, terletmeyen özel kumaş ibadet kıyafeti.',
      basePrice: 850,
      isOnSale: false,
      images: ['/images/products/prayer_wear_soft_1775305294432.png'],
      sizeType: SizeType.LETTERED,
      category: Category.PRAYER_WEAR, coverageLevel: CoverageLevel.FULLY_COVERED, length: ProductLength.MAXI, fit: FitType.REGULAR, occasion: Occasion.PRAYER, pieceCount: 1,
      variants: [
        { colorName: 'Krem', colorHex: '#fffdd0', size: 'L', stock: 20 },
      ]
    },
    {
      brandSlug: 'diger',
      name: 'Çocuk Şifon Elbise',
      slug: 'cocuk-sifon-elbise',
      description: 'Çocuklar için özel tasarım zarif şifon çocuk tesettür elbisesi.',
      basePrice: 1100,
      isOnSale: false,
      images: ['/images/products/kids_dress_1775305309197.png'],
      sizeType: SizeType.NUMBERED,
      category: Category.KIDS, coverageLevel: CoverageLevel.FULLY_COVERED, length: ProductLength.MAXI, fit: FitType.REGULAR, occasion: Occasion.SPECIAL, pieceCount: 1,
      variants: [
        { colorName: 'Kiremit', colorHex: '#cc5500', size: '10-11 Yaş', stock: 12 },
      ]
    },
    {
      brandSlug: 'diger',
      name: 'Kız Çocuk İkili Takım',
      slug: 'kiz-cocuk-ikili-takim',
      description: 'Rahat ve modern kız çocuk tesettür takımı.',
      basePrice: 1450,
      isOnSale: false,
      images: ['/images/products/kids_outfit_1775305324098.png'],
      sizeType: SizeType.NUMBERED,
      category: Category.KIDS, coverageLevel: CoverageLevel.FULLY_COVERED, length: null, fit: FitType.REGULAR, occasion: Occasion.DAILY, pieceCount: 2,
      variants: [
        { colorName: 'Bej', colorHex: '#f5f5dc', size: '8-9 Yaş', stock: 18 },
      ]
    }
  ]`;
content = content.replace('    }\n  ]', newProducts);
fs.writeFileSync(file, content);
console.log('Seed file successfully modified');
