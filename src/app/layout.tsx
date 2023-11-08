import { ReactNode } from 'react'
import './globals.css'
import { Open_Sans as OpenSans } from 'next/font/google'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

const openSans = OpenSans({ subsets: ['latin'] })

export const metadata = {
  title: 'Bigstore',
  description: 'O lugar perfeito para encontrar o que você procura.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={openSans.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
