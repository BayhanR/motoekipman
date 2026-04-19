import { auth } from "@/lib/auth"
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: 'MotoEkipman2.El | İkinci El Motosiklet Ekipmanları',
    template: '%s | MotoEkipman2.El'
  },
  description: 'En kaliteli ikinci el ve sıfır motosiklet kaskları, montları, eldivenleri ve koruyucu ekipmanları MotoEkipman2.El\'de.',
  keywords: ['motosiklet ekipmanları', 'ikinci el kask', 'motor montu', 'motosiklet aksesuar', 'dainese', 'alpinestars', 'agv'],
  openGraph: {
    title: "MotoEkipman2.El",
    description: "En kaliteli ikinci el ve sıfır motosiklet kaskları, montları, eldivenleri ve koruyucu ekipmanları MotoEkipman2.El'de.",
    type: 'website',
    locale: 'tr_TR',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <html lang="tr">
      <body
        className={cn(
          "min-h-screen bg-[#070707] font-sans antialiased",
          inter.variable,
          playfair.variable,
          "text-gray-200"
        )}
      >
        <Navbar isAdmin={isAdmin} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
