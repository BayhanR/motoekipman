'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/lib/uploadthing'
import { createProduct } from '@/actions/admin.actions'

export function ProductForm({ brands, filterOptions }: { brands: any[], filterOptions: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [variants, setVariants] = useState<any[]>([])

    // Core state
    const [formData, setFormData] = useState({
        name: '', brandId: '', description: '', basePrice: '',
        isOnSale: false, salePrice: '', sizeType: 'LETTERED',
        category: 'HELMETS', condition: 'USED', gender: 'UNISEX',
        helmetType: '', material: '', season: '', certification: ''
    })

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const addVariant = () => {
        setVariants([...variants, { colorName: '', colorHex: '#000000', size: '', stock: '' }])
    }

    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...variants]
        newVariants[index][field] = value
        setVariants(newVariants)
    }

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const payload = { ...formData, images, variants }
            await createProduct(payload)
            alert('Ürün başarıyla eklendi!')
            router.push('/admin/urunler')
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Ürün eklenirken bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-black/40 p-6 rounded-xl border border-gray-800 shadow-xl backdrop-blur-md">
            {/* Core Info */}
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-black italic tracking-wider mb-4 border-b border-red-900 pb-2 text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-red-600 rounded-sm"></span>
                    TEMEL BİLGİLER
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Ürün Adı *</label>
                        <input required type="text" name="name" onChange={handleChange} value={formData.name} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Marka *</label>
                        <select required name="brandId" onChange={handleChange} value={formData.brandId} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors">
                            <option value="">Seçiniz...</option>
                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Açıklama *</label>
                        <textarea required name="description" onChange={handleChange} value={formData.description} className="w-full bg-black border border-gray-800 rounded p-2 h-24 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Taban Fiyat (₺) *</label>
                        <input required type="number" name="basePrice" onChange={handleChange} value={formData.basePrice} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500 text-red-500">İndirimli Fiyat (₺)</label>
                        <input type="number" name="salePrice" onChange={handleChange} value={formData.salePrice} disabled={!formData.isOnSale} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors disabled:opacity-50" />
                        <div className="flex items-center mt-2 group cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, isOnSale: !prev.isOnSale }))}>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.isOnSale ? 'bg-red-600 border-red-600' : 'border-gray-600 group-hover:border-red-600'}`}>
                                {formData.isOnSale && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <label className="text-xs font-black ml-2 text-red-500 tracking-tighter uppercase cursor-pointer">Ürün İndirimde</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Moto Features */}
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-black italic tracking-wider mb-4 border-b border-red-900 pb-2 text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-red-600 rounded-sm"></span>
                    TEKNİK ÖZELLİKLER & KATEGORİ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Ana Kategori</label>
                        <select name="category" onChange={handleChange} value={formData.category} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors">
                            <option value="HELMETS">Kasklar</option>
                            <option value="JACKETS">Montlar & Ceketler</option>
                            <option value="PANTS">Pantolonlar</option>
                            <option value="GLOVES">Eldivenler</option>
                            <option value="BOOTS">Botlar & Ayakkabılar</option>
                            <option value="PROTECTORS">Korumalar</option>
                            <option value="ACCESSORIES">Aksesuarlar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Ürün Durumu</label>
                        <select name="condition" onChange={handleChange} value={formData.condition} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors">
                            <option value="NEW">Sıfır / Etiketli</option>
                            <option value="LIKE_NEW">Sıfır Ayarında</option>
                            <option value="GOOD">İyi Durumda</option>
                            <option value="USED">Kullanılmış</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Cinsiyet</label>
                        <select name="gender" onChange={handleChange} value={formData.gender} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors">
                            <option value="UNISEX">Unisex</option>
                            <option value="MEN">Erkek</option>
                            <option value="WOMEN">Kadın</option>
                        </select>
                    </div>
                    {formData.category === 'HELMETS' && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Kask Tipi</label>
                            <input type="text" name="helmetType" placeholder="Full Face, Modular..." onChange={handleChange} value={formData.helmetType} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Malzeme</label>
                        <input type="text" name="material" placeholder="Deri, GORE-TEX, Karbon..." onChange={handleChange} value={formData.material} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Mevsim</label>
                        <input type="text" name="season" placeholder="Yazlık, Kışlık, 4 Mevsim..." onChange={handleChange} value={formData.season} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-400">Sertifika</label>
                        <input type="text" name="certification" placeholder="ECE 22.06, DOT..." onChange={handleChange} value={formData.certification} className="w-full bg-black border border-gray-800 rounded p-2 text-white focus:border-red-600 outline-none transition-colors" />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-black italic tracking-wider mb-4 border-b border-red-900 pb-2 text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-red-600 rounded-sm"></span>
                    ÜRÜN GÖRSELLERİ
                </h3>
                {images.length > 0 ? (
                    <div className="flex gap-4 mb-4">
                        {images.map((img, i) => (
                            <div key={i} className="relative w-24 h-32 border border-gray-800 rounded overflow-hidden group">
                                <img src={img} alt="Uploaded" className="object-cover w-full h-full transition-transform group-hover:scale-110" />
                                <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">X</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-4 bg-black/50 rounded-xl p-4 border border-dashed border-gray-700">
                        <UploadDropzone
                            endpoint="productImage"
                            onClientUploadComplete={(res) => {
                                setImages(prev => [...prev, ...res.map(r => r.url)])
                            }}
                            onUploadError={(error: Error) => {
                                alert(`Hata: ${error.message}`);
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Variants Matrix */}
            <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-4 border-b border-red-900 pb-2">
                    <h3 className="text-lg font-black italic tracking-wider text-white flex items-center gap-2">
                        <span className="w-2 h-6 bg-red-600 rounded-sm"></span>
                        VARYANT MATRİSİ
                    </h3>
                    <Button type="button" onClick={addVariant} variant="outline" size="sm" className="font-bold border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                        + Yeni Varyasyon Ekle
                    </Button>
                </div>
                {variants.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">Ürünün en az bir renk ve beden seçeneği (varyantı) olmalıdır.</p>
                ) : (
                    <div className="space-y-4">
                        {variants.map((v, index) => (
                            <div key={index} className="flex items-end gap-3 bg-black/30 p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500 text-gray-500">Renk Adı</label>
                                    <input required placeholder="Siyah, Haki..." value={v.colorName} onChange={(e) => updateVariant(index, 'colorName', e.target.value)} className="w-full bg-black border border-gray-800 rounded p-1.5 text-sm text-white focus:border-red-600 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500 text-gray-500">Renk</label>
                                    <input required type="color" value={v.colorHex} onChange={(e) => updateVariant(index, 'colorHex', e.target.value)} className="h-9 border border-gray-800 p-0 w-12 rounded cursor-pointer bg-transparent" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500 text-gray-500">Beden</label>
                                    <input required placeholder="38, S, Standart..." value={v.size} onChange={(e) => updateVariant(index, 'size', e.target.value)} className="w-full bg-black border border-gray-800 rounded p-1.5 text-sm text-white focus:border-red-600 outline-none" />
                                </div>
                                <div className="w-24">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500 text-gray-500">Stok (Adet)</label>
                                    <input required type="number" value={v.stock} onChange={(e) => updateVariant(index, 'stock', e.target.value)} className="w-full bg-black border border-gray-800 rounded p-1.5 text-sm text-white focus:border-red-600 outline-none" />
                                </div>
                                <Button type="button" onClick={() => removeVariant(index)} variant="destructive" size="sm" className="h-9 text-xs font-bold uppercase tracking-tighter">Sil</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-800 text-right">
                <Button type="submit" disabled={loading || variants.length === 0} className="bg-red-600 hover:bg-red-700 text-white font-black italic tracking-tighter h-14 px-12 text-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all hover:scale-105 active:scale-95">
                    {loading ? 'KAYDEDİLİYOR...' : 'ÜRÜNÜ YAYINLA'}
                </Button>
            </div>
        </form>
    )
}
