import { ProductCard } from '@/components/molecules/ProductCard'
import { Pagination } from '@/components/molecules/Pagination'
import { ProductFilter } from '@/components/molecules/ProductFilter'
import { Product } from '@/types/product'
import { api } from '@/utils/api'

export async function ProductList() {
  const response = await api.get('/products')

  const products: Product[] = response.data

  return (
    <section>
      <ProductFilter />
      <div className="m-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-between gap-10 text-black">
        {products.map((product: Product) => {
          if (product.images.length > 0) {
            return <ProductCard key={product.id} product={product} />
          }
          return <></>
        })}
      </div>
      <Pagination />
    </section>
  )
}
