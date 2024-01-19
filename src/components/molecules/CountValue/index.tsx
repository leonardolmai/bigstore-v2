import React, { useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'

type CounterProps = {
  maxLimit: number
  initialQuantity: number
  onCountChange: (count: number) => void
}

export function Counter({
  maxLimit,
  initialQuantity,
  onCountChange,
}: CounterProps) {
  const [count, setCount] = useState(initialQuantity)

  const increment = () => {
    if (count < maxLimit) {
      const newCount = count + 1
      setCount(newCount)
      onCountChange(newCount)
    }
  }

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1
      setCount(newCount)
      onCountChange(newCount)
    }
  }

  return (
    <div className="flex flex-row items-center justify-start">
      <button
        className="m-1 text-center"
        onClick={decrement}
        disabled={count === 1}
      >
        <MinusCircle
          width={24}
          className={`${
            count > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''
          }`}
        />
      </button>
      <input
        className="w-12 rounded-2xl pl-2 text-center"
        type="number"
        value={count}
        readOnly
      />
      <button
        className="m-1 text-center"
        onClick={increment}
        disabled={count === maxLimit}
      >
        <PlusCircle
          width={24}
          className={`${
            count > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''
          }`}
        />
      </button>
    </div>
  )
}
