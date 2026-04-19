import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    await resend.emails.send({
        from: 'Tesettür Mağaza <onboarding@resend.dev>',
        to: email,
        subject: 'Hesabınızı Doğrulayın',
        html: `<p>Hesabınızı doğrulamak için <a href="${confirmLink}">buraya tıklayın</a>.</p>`,
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/sifremi-unuttum?token=${token}`

    await resend.emails.send({
        from: 'Tesettür Mağaza <onboarding@resend.dev>',
        to: email,
        subject: 'Şifre Sıfırlama İsteği',
        html: `<p>Şifrenizi sıfırlamak için <a href="${resetLink}">buraya tıklayın</a>.</p>`,
    })
}

export const sendPriceDropEmail = async (
    email: string,
    productName: string,
    oldPrice: number,
    newPrice: number,
    slug: string
) => {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/urun/${slug}`

    await resend.emails.send({
        from: 'Tesettür Mağaza <onboarding@resend.dev>',
        to: email,
        subject: 'Favori ürününüzün fiyatı düştü! 🏷️',
        html: `
      <h2>${productName} isimli ürünün fiyatı düştü!</h2>
      <p>Eski Fiyat: <s>${oldPrice}₺</s></p>
      <p>Yeni Fiyat: <strong>${newPrice}₺</strong></p>
      <p>Hemen incelemek için <a href="${link}">buraya tıklayın</a>.</p>
    `,
    })
}

export const sendStockAvailableEmail = async (
    email: string,
    productName: string,
    colorName: string,
    size: string,
    slug: string
) => {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/urun/${slug}`

    await resend.emails.send({
        from: 'Tesettür Mağaza <onboarding@resend.dev>',
        to: email,
        subject: 'Takip ettiğiniz ürün stokta! 📦',
        html: `
      <h2>Beklediğiniz haber geldi!</h2>
      <p>${productName} - ${colorName} / Beden: ${size} tekrar stoklarımızda.</p>
      <p>Hemen satın almak için <a href="${link}">buraya tıklayın</a>.</p>
    `,
    })
}
