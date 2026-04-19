'use client'

import React, { useState } from 'react'
import { registerUser } from '@/actions/auth.actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const res = await registerUser(formData)

        if (res.error) {
            setError(res.error)
        } else {
            setSuccess('Kayıt başarılı! Lütfen e-postanızı kontrol ederek hesabınızı doğrulayın.')
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 font-serif">
                        Hemen Kayıt Ol
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">{error}</div>}
                    {success && <div className="text-green-600 text-md font-medium text-center bg-green-50 p-4 border border-green-200 rounded">{success}</div>}

                    {!success && (
                        <>
                            <div className="space-y-4 rounded-md shadow-sm">
                                <div>
                                    <Label htmlFor="name">Ad Soyad</Label>
                                    <Input id="name" name="name" type="text" required />
                                </div>
                                <div>
                                    <Label htmlFor="email">E-posta</Label>
                                    <Input id="email" name="email" type="email" required />
                                </div>
                                <div>
                                    <Label htmlFor="password">Şifre</Label>
                                    <Input id="password" name="password" type="password" required minLength={6} />
                                </div>
                            </div>

                            <div>
                                <Button type="submit" disabled={loading} className="w-full bg-[#111111] hover:bg-black text-white h-12">
                                    {loading ? 'Kaydediliyor...' : 'Aramıza Katıl'}
                                </Button>
                            </div>
                        </>
                    )}

                    <div className="text-center text-sm pt-4 border-t">
                        Zaten hesabınız var mı?{' '}
                        <Link href="/giris" className="font-medium text-[#C9A66B] hover:text-[#b09055]">
                            Giriş Yapın
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
