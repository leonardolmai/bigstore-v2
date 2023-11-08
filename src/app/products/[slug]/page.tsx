import CarouselComponent from '@/components/organisms/carousel'
import Detail_sale from '@/components/organisms/detail_sale'
import { Product } from '@/types/product'
import { api } from '@/utils/api'

export default function Products({ params }: { params: { slug: string } }) {
  const fetchProduct = async () => {
    try {
      const response = await api.get<Product>(`/products/${params.slug}/`)
      const fetchedProduct = response.data
      // Renderizar o componente com os dados do produto
      return (
        <div className="flex h-auto  flex-row flex-wrap justify-center gap-6 md:flex-nowrap  md:justify-between md:px-8 md:py-8">
          <div className="w-11/12 rounded-xl bg-[#F1F1F4]">
            <div className="relative m-auto w-full max-w-[1400px] px-4 py-4 md:h-[780px]">
              <CarouselComponent product={fetchedProduct} />
            </div>
            <p className="px-4 py-1 font-bold">Descrição Geral:</p>
            {fetchedProduct && (
              <p className="px-4 py-5">{fetchedProduct.description}</p>
            )}
          </div>
          <div className="ml-0 w-10/12 basis-40 items-center rounded-xl bg-[#F1F1F4] pb-2 max-md:mb-8 max-md:items-center md:ml-14 md:px-6">
            <Detail_sale product={fetchedProduct} />
          </div>
        </div>
      )
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }

  // Chamar a função fetchProduct diretamente para obter o resultado
  return fetchProduct()
}
