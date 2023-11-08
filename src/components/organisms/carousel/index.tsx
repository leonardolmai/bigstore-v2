'use client';
import React, { useState } from 'react';
import { B_carousel } from '@/components/atoms/buttons';
import { ProductProps } from '@/types/product';

const Carousel = ({ product }: ProductProps) => {
  const [currentIndex, SetCurentIndex] = useState(0);
  const slides = product?.images?.map((image) => ({ url: image.image })) || [];

  const handleNextSlide = () => {
    SetCurentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    SetCurentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
      <button onClick={handlePrevSlide}><B_carousel direction="left" /></button>
      <button onClick={handleNextSlide}><B_carousel direction="right" /></button>
    </div>
  );
};

export default function CarouselComponent({ product }: ProductProps): React.JSX.Element {
  return (
    <div className="relative m-auto flex h-full w-full max-w-[1400px] flex-row justify-center  rounded-xl px-4 py-4 shadow-xl max-md:h-60">
      <Carousel product={product} />
    </div>
  );
}
