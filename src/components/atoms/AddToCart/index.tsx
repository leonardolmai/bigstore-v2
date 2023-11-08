'use client'
import { ProductProps } from '@/types/product'
import { LuPlus, LuShoppingCart } from 'react-icons/lu'

export function AddToCart({ product }: ProductProps) {
  const handleAddToCart = () => {
    const cartItem = {
      QuantitySelect: 1,
      product,
    }
    localStorage.setItem(product.id.toString(), JSON.stringify(cartItem))
  }

  return (
    <button
      onClick={handleAddToCart}
      className="relative rounded-full bg-primary p-2 text-white transition-colors duration-300 hover:bg-primary-dark focus:outline-none"
      title="Adicionar ao Carrinho"
    >
      <div className="absolute right-2 top-0.5 flex items-center justify-center">
        <LuPlus className="h-3 w-3" size={24} />
      </div>
      <LuShoppingCart className="h-5 w-5" size={24} />
    </button>
  )
}
