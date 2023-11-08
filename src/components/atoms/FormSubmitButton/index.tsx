import { ChildrenProps } from '@/types/componentChildren'

export function FormSubmitButton({ children }: ChildrenProps) {
  return (
    <button
      type="submit"
      className="mb-4 rounded-md bg-primary px-4 py-2 font-bold text-white hover:bg-primary-dark"
    >
      {children}
    </button>
  )
}
