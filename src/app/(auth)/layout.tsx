import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 justify-center p-2 sm:p-10">{children}</main>
  )
}
