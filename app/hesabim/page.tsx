import React from 'react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function HesabimPage() {
    const session = await auth()

    // session exists because middleware protects the route
    const user = await prisma.user.findUnique({
        where: { id: session!.user!.id }
    })

    return (
        <div>
            <h1 className="text-2xl font-serif text-gray-900 font-bold mb-6">Profil Bilgilerim</h1>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-xl">
                <form className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Ad Soyad</Label>
                            <Input id="name" defaultValue={user?.name || ''} />
                        </div>
                        <div>
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" defaultValue={user?.email || ''} disabled className="bg-gray-50" />
                            <p className="text-xs text-gray-400 mt-1">E-posta adresi değiştirilemez.</p>
                        </div>
                    </div>
                    <Button type="button" className="bg-[#111111] hover:bg-black text-white" onClick={() => { }}>Güncelle</Button>
                </form>
            </div>
        </div>
    )
}
