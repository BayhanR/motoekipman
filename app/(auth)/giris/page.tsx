'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const res = await signIn('credentials', { email, password, redirect: false })
        if (res?.error) {
            setError('Geçersiz e-posta veya şifre.')
        } else {
            router.push('/admin') // Redirect admin directly, middleware handles generic
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 font-serif">
                        Giriş Yap
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">{error}</div>}
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="password">Şifre</Label>
                            <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/sifremi-unuttum" className="font-medium text-[#C9A66B] hover:text-[#b09055]">
                                Şifrenizi mi unuttunuz?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" disabled={loading} className="w-full bg-[#111111] hover:bg-black text-white h-12">
                            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>
                    </div>

                    <div className="text-center text-sm pt-4 border-t">
                        Hesabınız yok mu?{' '}
                        <Link href="/kayit" className="font-medium text-[#C9A66B] hover:text-[#b09055]">
                            Kayıt Olun
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
