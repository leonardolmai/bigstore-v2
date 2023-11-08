import React from 'react'
import {
  ChevronLeft as Left,
  ChevronRight as Right,
  ShoppingCart as Cart,
  CreditCard,
  MapPin as Address,
} from 'lucide-react'
interface B_carouselProps {
  direction: 'right' | 'left'
}

export function B_carousel({ direction }: B_carouselProps) {
  return (
    <div
      className={`translate-y-y[-50%] absolute top-[50%] -translate-x-0 ${
        direction === 'right' ? 'right-5' : 'left-5'
      } ${
        direction === 'right' ? 'rounded-e-lg' : 'rounded-s-lg'
      } ounded-full cursor-pointer bg-black/50 p-2 text-2xl text-white hover:bg-black/100 active:bg-white/20`}
    >
      {direction === 'right' ? <Right size={30} /> : <Left size={30} />}
    </div>
  )
}

interface B_form {
  name: string
  size: 's-small' | 'small' | 'medium' | 'large'
  onclick: string
  type: 'freight' | 'Buy_now' | 'Cart' | 'Alter_Address'
}

export function B_forms({ name, size, onclick, type }: B_form) {
  let buttonWidthClass = ''
  if (size === 's-small') {
    buttonWidthClass = 'w-40'
  } else if (size === 'small') {
    buttonWidthClass = 'w-40'
  } else if (size === 'medium') {
    buttonWidthClass = 'w-60'
  } else if (size === 'large') {
    buttonWidthClass = 'w-80'
  }
  let text_info: React.ReactNode = ''
  if (type === 'freight') {
    text_info = (
      <React.Fragment>
        <p>Calcular</p>
      </React.Fragment>
    )
  } else if (type === 'Buy_now') {
    text_info = (
      <React.Fragment>
        <CreditCard
          color="black"
          size={15}
          stroke={'white'}
          strokeWidth={'2'}
        />
        <p className="px-1">{name}</p>
      </React.Fragment>
    )
  } else if (type === 'Cart') {
    text_info = (
      <React.Fragment>
        <Cart color="black" size={15} stroke={'white'} />
        <p className="px-1">{name}</p>
      </React.Fragment>
    )
  } else if (type === 'Alter_Address') {
    text_info = (
      <React.Fragment>
        <Address />
        <p className="px-1">{name}</p>
      </React.Fragment>
    )
  }

  return (
    <button
      onClick={onclick}
      type="submit"
      className={` ${buttonWidthClass} rounded-md bg-primary px-2 py-2 font-bold text-white shadow-md hover:bg-primary-dark active:bg-primary-dark`}
    >
      <div className="flex flex-row items-center justify-center">
        {text_info}
      </div>
    </button>
  )
}
