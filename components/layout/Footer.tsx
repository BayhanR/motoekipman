'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(
    () => import('@/components/shared/LeafletMap'),
    { ssr: false, loading: () => <div className="h-32 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-500">Harita Yükleniyor...</div> }
)

export function Footer() {
    return (
        <footer className="bg-[#111111] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="mb-4 block">
                            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-[#EF4444]">MOTO<span className="text-gray-200">EKİPMAN</span><span className="text-sm text-gray-500 ml-1">2EL</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm mt-4">
                            Güvenli sürüşün adresi. Kaliteli ikinci el ve sıfır motosiklet ekipmanları.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-[#EF4444]">Hızlı Linkler</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/urunler" className="hover:text-white transition-colors">Yeniler</Link></li>
                            <li><Link href="/urunler" className="hover:text-white transition-colors">Çok Satanlar</Link></li>
                            <li><Link href="/iletisim" className="hover:text-white transition-colors">Bize Ulaşın</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-[#EF4444]">Kurumsal</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-[#EF4444]">Mağazamız</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Kemalpaşa, İzmir<br />
                            Türkiye
                        </p>
                        {/* Dynamic Leaflet Map */}
                        <div className="h-32 w-full rounded overflow-hidden">
                            <LeafletMap zoom={13} className="h-full w-full z-0" />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <div>
                        &copy; {new Date().getFullYear()} MotoEkipman2El. Tüm hakları saklıdır.
                    </div>
                    <div>
                        <Link href="https://bayhan.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                            <span>bayhan.tech tarafından geliştirildi</span>
                            <img src="https://bayhan.tech/_next/image/?url=%2Fbayhan-logo.png&w=64&q=75" alt="Bayhan.Tech" className="h-5 w-auto opacity-50 group-hover:opacity-100 transition-opacity invert" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
