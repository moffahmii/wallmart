'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export default function ProductSlider({ image, altCont }: { image: string[], altCont: string }) {
    return <>
        <Carousel opts={{
            loop: true
        }}
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}>
            <CarouselContent>
                {image.map((img, index) => (
                    <CarouselItem key={index}>
                        <Image src={img} width={300} height={300} alt={altCont} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </>
}
