import { ChildrenProps } from '@/types/componentChildren'

export function FormErrorMessage({ children }: ChildrenProps) {
  return <p className="mb-4 text-sm text-red-500 lg:text-lg">{children}</p>
}
