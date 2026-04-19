'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HeroSlide {
    id: number
    type: 'image' | 'video'
    src: string
}

const HERO_SLIDES: HeroSlide[] = [
    { id: 1, type: 'image', src: '/images/slider/hero-1.png' },
    { id: 2, type: 'image', src: '/images/slider/hero-2.png' },
    { id: 3, type: 'image', src: '/images/slider/hero-3.png' },
]

export function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (HERO_SLIDES[currentIndex].type === 'image') {
            timer = setTimeout(() => {
                nextSlide()
            }, 5000)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [currentIndex])

    return (
        <div className="relative w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] bg-black overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
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
                            transition={{ duration: 6.5, ease: 'linear' }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={HERO_SLIDES[currentIndex].src}
                                alt="Hero görseli"
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="hidden opacity-0 pointer-events-none">
                {HERO_SLIDES.map((slide) =>
                    slide.type === 'image' ? (
                        <Image
                            key={`preload-${slide.id}`}
                            src={slide.src}
                            alt=""
                            width={10}
                            height={10}
                            priority
                            loader={({ src }) => src}
                            unoptimized
                        />
                    ) : null
                )}
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10 pointer-events-auto">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 transition-all duration-500 rounded-full ${
                            currentIndex === idx ? 'w-12 bg-[#EF4444]' : 'w-6 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Slayt ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
