'use client'
import React, { useState } from 'react'
import { B_carousel } from '@/components/atoms/buttons'
import { ProductWithImagesProps } from '@/types/product'

const Carousel = ({ product, images }: ProductWithImagesProps) => {
  const [currentIndex, SetCurentIndex] = useState(0)
  const slides = images?.map((image) => ({ url: image.image })) || []

  const handleNextSlide = () => {
    SetCurentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const handlePrevSlide = () => {
    SetCurentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    )
  }

  return (
    <div
      style={{
        backgroundImage: `url(http://127.0.0.1:8002/${slides[currentIndex]?.url})`,
      }}
      className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
    >
      <button onClick={handlePrevSlide}>
        <B_carousel direction="left" />
      </button>
      <button onClick={handleNextSlide}>
        <B_carousel direction="right" />
      </button>
    </div>
  )
}

export default function CarouselComponent({
  product,
  images,
}: ProductWithImagesProps): React.JSX.Element {
  return (
    <div className="relative m-auto flex h-full w-full max-w-[1400px] flex-row justify-center  rounded-xl px-4 py-4 shadow-xl max-md:h-60">
      <Carousel product={product} images={images} />
    </div>
  )
}
