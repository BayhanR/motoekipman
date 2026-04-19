'use client'

import React from 'react'

export default function PasswordResetPage() {
    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 font-serif mb-4">Şifremi Unuttum</h2>
                <p className="text-gray-500 mb-8">Lütfen e-posta adresinizi girin. Şifre sıfırlama bağlantısını göndereceğiz.</p>
                <form className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium">E-posta</label>
                        <input type="email" required className="w-full mt-1 border px-3 py-2 rounded-md" />
                    </div>
                    <button type="button" className="w-full bg-[#111111] hover:bg-black text-white h-12 rounded-md font-medium" onClick={() => alert('Şifre sıfırlama modülü demo sürümünde devre dışı')}>
                        Bağlantı Gönder
                    </button>
                </form>
            </div>
        </div>
    )
}
