'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '@/lib/resend'
import { randomBytes } from 'crypto'
import { TokenType } from '@prisma/client'

export async function registerUser(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password || !name) return { error: 'Tüm alanları doldurun.' }

    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return { error: 'Bu e-posta adresi zaten kullanılıyor.' }

        const passwordHash = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            }
        })

        const token = randomBytes(32).toString('hex')
        await prisma.verificationToken.create({
            data: {
                email: user.email!,
                token,
                type: TokenType.EMAIL_VERIFY,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
            }
        })

        if (process.env.RESEND_API_KEY) {
            await sendVerificationEmail(user.email!, token)
        }

        return { success: true }
    } catch (error) {
        return { error: 'Kayıt olurken bir hata oluştu.' }
    }
}
