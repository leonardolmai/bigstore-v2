import { InputProps } from '@/types/inputProps'

export function FormInput({
  type,
  value,
  onChange,
  placeholder,
  className,
}: InputProps) {
  const inputClasses = `${className} mb-4 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary`

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClasses}
    />
  )
}
