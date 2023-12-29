export interface ProductImage {
  id: number
  image: string
}

export interface Product {
  id: number
  name: string
  price: number
  quantity: number
  description: string | null
  is_approved: boolean
  created_by: number
  company: number
  category: string
  // images: ProductImage[]
}

export interface ProductProps {
  product: Product
}

export interface ProductWithImagesProps {
  product: Product
  images: ProductImage[]
}
