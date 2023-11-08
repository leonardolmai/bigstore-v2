export interface OrderItem {
  id: number
  order: number
  product: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  user: number
  company: number
  status: string
  created_at: string
  payment_method: string
  payment_details: string
  delivery_address: string
  total: string
  order_items: OrderItem[]
}
