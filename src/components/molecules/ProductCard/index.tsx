import { AddToCart } from '@/components/atoms/AddToCart'
import { ProductProps } from '@/types/product'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard({ product }: ProductProps) {
  return (
    <div>
      <div className="m-auto rounded-lg border border-gray-200 bg-white shadow transition-shadow hover:shadow-lg">
        <Link href={`/products/${product.id}`}>
          <div className="relative">
            <Image
              className="h-52 w-full rounded-t-lg object-cover"
              src={product.images[0].image}
              alt={product.name}
              width={300}
              height={220}
            />
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h5 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h5>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <Link href={`/products/${product.id}`} className="grow">
              <span className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </Link>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
