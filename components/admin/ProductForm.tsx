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
        isOnSale: false, salePrice: '', sizeType: 'NUMBERED',
        category: 'DRESS', coverageLevel: '', length: '', fit: '', occasion: '', pieceCount: ''
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
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl border shadow-sm">
            {/* Core Info */}
            <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Temel Bilgiler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Ürün Adı *</label>
                        <input required type="text" name="name" onChange={handleChange} value={formData.name} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Marka *</label>
                        <select required name="brandId" onChange={handleChange} value={formData.brandId} className="w-full border rounded p-2">
                            <option value="">Seçiniz...</option>
                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Açıklama *</label>
                        <textarea required name="description" onChange={handleChange} value={formData.description} className="w-full border rounded p-2 h-24" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Taban Fiyat (₺) *</label>
                        <input required type="number" name="basePrice" onChange={handleChange} value={formData.basePrice} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-red-600">İndirimli Fiyat (₺)</label>
                        <input type="number" name="salePrice" onChange={handleChange} value={formData.salePrice} disabled={!formData.isOnSale} className="w-full border rounded p-2 disabled:bg-gray-100" />
                        <div className="flex items-center mt-2">
                            <input type="checkbox" name="isOnSale" id="isOnSale" checked={formData.isOnSale} onChange={handleChange} className="mr-2" />
                            <label htmlFor="isOnSale" className="text-sm font-bold text-red-600">Ürün İndirimde</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modest Filters */}
            <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Modest Kategori & Filtreler</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Ana Kategori</label>
                        <select name="category" onChange={handleChange} value={formData.category} className="w-full border rounded p-2">
                            {filterOptions.categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Kullanım Alanı</label>
                        <select name="occasion" onChange={handleChange} value={formData.occasion} className="w-full border rounded p-2">
                            <option value="">Belirtilmedi</option>
                            {filterOptions.occasions.map((o: string) => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Kalıp (Fit)</label>
                        <select name="fit" onChange={handleChange} value={formData.fit} className="w-full border rounded p-2">
                            <option value="">Belirtilmedi</option>
                            {filterOptions.fits.map((f: string) => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Ürün Boyu (Uzunluk)</label>
                        <select name="length" onChange={handleChange} value={formData.length} className="w-full border rounded p-2">
                            <option value="">Belirtilmedi</option>
                            {filterOptions.lengths.map((l: string) => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tesettür Kapsama Seviyesi</label>
                        <select name="coverageLevel" onChange={handleChange} value={formData.coverageLevel} className="w-full border rounded p-2">
                            <option value="">Belirtilmedi</option>
                            {filterOptions.coverageLevels.map((cl: string) => <option key={cl} value={cl}>{cl}</option>)}
                        </select>
                    </div>
                    {formData.category === 'SET' && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Parça Sayısı (Sadece Setler İçin)</label>
                            <input type="number" name="pieceCount" onChange={handleChange} value={formData.pieceCount} className="w-full border rounded p-2" />
                        </div>
                    )}
                </div>
            </div>

            {/* Images */}
            <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Ürün Görselleri</h3>
                {images.length > 0 ? (
                    <div className="flex gap-4 mb-4">
                        {images.map((img, i) => (
                            <div key={i} className="relative w-24 h-32 border rounded overflow-hidden">
                                <img src={img} alt="Uploaded" className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-4">
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
            <div>
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold">Varyant Matrisi (Renk & Beden Kombinasyonları)</h3>
                    <Button type="button" onClick={addVariant} variant="outline" size="sm" className="font-bold border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-white">
                        + Yeni Varyasyon Ekle
                    </Button>
                </div>
                {variants.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">Ürünün en az bir renk ve beden seçeneği (varyantı) olmalıdır.</p>
                ) : (
                    <div className="space-y-4">
                        {variants.map((v, index) => (
                            <div key={index} className="flex items-end gap-3 bg-gray-50 p-3 rounded border">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Renk Adı</label>
                                    <input required placeholder="Siyah, Haki..." value={v.colorName} onChange={(e) => updateVariant(index, 'colorName', e.target.value)} className="w-full border rounded p-1 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Renk Kodu</label>
                                    <input required type="color" value={v.colorHex} onChange={(e) => updateVariant(index, 'colorHex', e.target.value)} className="h-8 border p-0 w-12 rounded cursor-pointer" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Beden</label>
                                    <input required placeholder="38, S, Standart..." value={v.size} onChange={(e) => updateVariant(index, 'size', e.target.value)} className="w-full border rounded p-1 text-sm" />
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Stok (Adet)</label>
                                    <input required type="number" value={v.stock} onChange={(e) => updateVariant(index, 'stock', e.target.value)} className="w-full border rounded p-1 text-sm" />
                                </div>
                                <Button type="button" onClick={() => removeVariant(index)} variant="destructive" size="sm" className="h-8 text-xs">Sil</Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 border-t text-right">
                <Button type="submit" disabled={loading || variants.length === 0} className="bg-[#C9A66B] hover:bg-[#b08b53] text-black font-bold h-12 px-8 text-lg">
                    {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
                </Button>
            </div>
        </form>
    )
}
