import { ProductList } from '@/components/organisms/ProductList'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col p-2 sm:p-10">
      {/* @ts-expect-error Server Component */}
      <ProductList />
    </main>
  )
}
