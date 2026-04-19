'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Leaflet Map must be dynamically imported with ssr: false
const LeafletMap = dynamic(
    () => import('@/components/shared/LeafletMap'),
    { ssr: false, loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-md flex items-center justify-center">Harita yükleniyor...</div> }
)

export default function IletisimPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px] w-full bg-black overflow-hidden shrink-0">
                <img
                    src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=2670&auto=format&fit=crop"
                    alt="Motorcycle Gear"
                    className="object-cover w-full h-full opacity-40 grayscale"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 drop-shadow-2xl">BİZE <span className="text-[#EF4444]">ULAŞIN</span></h1>
                    <p className="text-sm md:text-base text-gray-300 font-bold tracking-[0.3em] uppercase drop-shadow">GÜVENLİ SÜRÜŞ, KALİTELİ EKİPMAN</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl py-12 relative z-10 -mt-20 md:-mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#111] p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-800">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-lg font-black italic tracking-wider mb-2 text-[#EF4444] uppercase">Adresimiz</h2>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                MotoEkipman2Er Showroom<br />
                                Bağdat Caddesi, No:321<br />
                                Kadıköy, İstanbul<br />
                                Türkiye
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-black italic tracking-wider mb-2 text-[#EF4444] uppercase">İletişim Bilgileri</h2>
                            <p className="text-gray-400 font-medium">
                                <strong className="text-white">Telefon:</strong> +90 (216) 555 44 33<br />
                                <strong className="text-white">E-posta:</strong> info@motoekipman2el.com
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-black italic tracking-wider mb-2 text-[#EF4444] uppercase">Hizmet Saatleri</h2>
                            <p className="text-gray-400 font-medium">
                                Hafta İçi: 10:00 - 20:00<br />
                                Pazar: 12:00 - 18:00
                            </p>
                        </div>
                    </div>

                    <div className="h-[400px] rounded-lg overflow-hidden shadow-inner border border-gray-100">
                        <LeafletMap />
                    </div>
                </div>
            </div>
        </div>
    )
}
