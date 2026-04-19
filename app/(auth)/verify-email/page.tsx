import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TokenType } from '@prisma/client'

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const resolved = await searchParams
    const token = resolved.token

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 text-center">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Geçersiz Link</h2>
                    <p className="text-gray-600 mb-6">Doğrulama linki eksik veya geçersiz.</p>
                    <Button asChild className="w-full"><Link href="/giris">Giriş Yap</Link></Button>
                </div>
            </div>
        )
    }

    const verificationToken = await prisma.verificationToken.findUnique({
        where: { token }
    })

    if (!verificationToken || verificationToken.expires < new Date() || verificationToken.type !== TokenType.EMAIL_VERIFY) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 text-center">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Süresi Dolmuş</h2>
                    <p className="text-gray-600 mb-6">Bu doğrulama linki artık geçerli değil.</p>
                    <Button asChild className="w-full"><Link href="/giris">Giriş Yap</Link></Button>
                </div>
            </div>
        )
    }

    await prisma.user.update({
        where: { email: verificationToken.email },
        data: { emailVerified: new Date() }
    })

    await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
    })

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 text-center">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border">
                <h2 className="text-3xl font-serif font-bold text-[#C9A66B] mb-4">Başarılı!</h2>
                <p className="text-gray-600 mb-6">E-posta adresiniz başarıyla doğrulandı. Artık giriş yapabilirsiniz.</p>
                <Button asChild className="w-full bg-[#111111] hover:bg-black text-white"><Link href="/giris">Giriş Yap</Link></Button>
            </div>
        </div>
    )
}
