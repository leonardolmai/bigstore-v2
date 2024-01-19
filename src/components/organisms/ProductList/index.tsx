import { ProductCard } from '@/components/molecules/ProductCard'
import { Pagination } from '@/components/molecules/Pagination'
import { ProductFilter } from '@/components/molecules/ProductFilter'
import { Product } from '@/types/product'
import { api, api2 } from '@/utils/api'

export async function ProductList() {
  const response = await api2.get('/products')

  const products: Product[] = response.data

  return (
    <section>
      <ProductFilter />
      <div className="m-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-between gap-10 text-black">
        {products.map(async (product: Product) => {
          const imageResponse = await api2.get(`/products/${product.id}/images`)
          // const images: ProductImageOut[] = imageResponse.data
          const images = imageResponse.data

          if (images.length > 0 && product.quantity > 0) {
            return (
              <ProductCard key={product.id} product={product} images={images} />
            )
          }
          return <></>
        })}
      </div>
      <Pagination />
    </section>
  )
}
