import { ChangeEvent } from 'react'

export interface InputProps {
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
}
