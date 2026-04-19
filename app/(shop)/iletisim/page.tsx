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
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2669&auto=format&fit=crop"
                    alt="Contact Hero"
                    className="object-cover w-full h-full opacity-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-lg">İletişim</h1>
                    <p className="text-lg text-gray-200 font-light drop-shadow">Moda ve şıklık yolculuğunuzda size yardımcı olmaktan mutluluk duyarız.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl py-12 relative z-10 -mt-20 md:-mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-100">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-[#C9A66B]">Adresimiz</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Atatürk Mahallesi, Mimar Sinan Cd. No:45<br />
                                Kemalpaşa, İzmir<br />
                                Türkiye
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-[#C9A66B]">İletişim Bilgileri</h2>
                            <p className="text-gray-600">
                                <strong>Telefon:</strong> +90 (232) 123 45 67<br />
                                <strong>E-posta:</strong> info@minagiyim.com
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-[#C9A66B]">Çalışma Saatleri</h2>
                            <p className="text-gray-600">
                                Pazartesi - Cumartesi: 09:00 - 19:30<br />
                                Pazar: Kapalı
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
