'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const HERO_SLIDES = [
    {
        id: 1,
        type: 'image',
        src: '/images/slider/hero-1.png',
        title: '',
        subtitle: '',
        cta: 'Hemen İncele'
    },
    {
        id: 2,
        type: 'image',
        src: '/images/slider/hero-2.png',
        title: '',
        subtitle: '',
        cta: 'Koleksiyonu Gör'
    },
    {
        id: 3,
        type: 'image',
        src: '/images/slider/hero-3.png',
        title: '',
        subtitle: '',
        cta: 'Ekipman Ara'
    }
]

export function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (HERO_SLIDES[currentIndex].type === 'image') {
            timer = setTimeout(() => {
                nextSlide();
            }, 5000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentIndex])

    return (
        <div className="relative w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] bg-black overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {HERO_SLIDES[currentIndex].type === 'video' ? (
                        <video
                            src={HERO_SLIDES[currentIndex].src}
                            autoPlay
                            muted
                            playsInline
                            onEnded={nextSlide}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <motion.div
                            initial={{ scale: 1.15 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 6.5, ease: "linear" }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={HERO_SLIDES[currentIndex].src}
                                alt="Hero Image"
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* DOM Eager Preloading Hack to Smooth Out Transitions */}
            <div className="hidden opacity-0 pointer-events-none">
                {HERO_SLIDES.map((slide) => (
                    slide.type === 'image' && <Image key={`preload-${slide.id}`} src={slide.src} alt="Preload Cache" width={10} height={10} priority loader={({ src }) => src} unoptimized />
                ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 pointer-events-none pb-20 md:pb-32">
                <AnimatePresence mode="wait">
                    {HERO_SLIDES[currentIndex].title && (
                        <motion.h1
                            key={`title-${currentIndex}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight max-w-4xl"
                        >
                            {HERO_SLIDES[currentIndex].title}
                        </motion.h1>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {HERO_SLIDES[currentIndex].subtitle && (
                        <motion.p
                            key={`subtitle-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-lg md:text-2xl font-light mb-8 max-w-2xl drop-shadow-md text-gray-200"
                        >
                            {HERO_SLIDES[currentIndex].subtitle}
                        </motion.p>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.button
                        key={`cta-${currentIndex}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#EF4444", color: "#fff", borderColor: "#EF4444" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        onClick={() => document.getElementById('urunler')?.scrollIntoView({ behavior: 'smooth' })}
                        className="pointer-events-auto px-10 py-4 bg-white/5 backdrop-blur-md border border-white/40 text-white font-black italic tracking-[0.2em] uppercase text-xs transition-all cursor-pointer shadow-2xl"
                    >
                        {HERO_SLIDES[currentIndex].cta}
                    </motion.button>
                </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10 pointer-events-auto">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 transition-all duration-500 rounded-full ${currentIndex === idx ? "w-12 bg-[#EF4444]" : "w-6 bg-white/40 hover:bg-white/70"
                            }`}
                        aria-label={`Slayt ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
