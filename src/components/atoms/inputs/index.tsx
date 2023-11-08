import React, { useState, useEffect } from 'react'

interface InputFieldProps {
  label: string
  name: string
  id: string
  style:
    | 'input-text-sales'
    | 'input-date-see'
    | 'input-text-see'
    | 'input-msg-see'
  size: 'small' | 'medium' | 'large'
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
  label,
  name,
  id,
  style,
  size,
  value,
  onChange,
}: InputFieldProps) {
  const [isMsg, setIsMsg] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (style === 'input-date-see' || style === 'input-text-see') {
        setIsDisabled(true)
      } else if (style === 'input-msg-see') {
        setIsDisabled(true)
        setIsMsg(true)
      } else {
        setIsMsg(false)
        setIsDisabled(false)
      }
    }
  }, [style])

  let inputclassSize = ''
  const classnames = {
    div: '',
    input: '',
    autocomplete: '',
  }
  let inputtype = ''

  if (size === 'small') {
    inputclassSize = 'min-w-42'
  } else if (size === 'medium') {
    inputclassSize = 'min-w-72'
  } else if (size === 'large') {
    inputclassSize = 'min-w-80'
  }

  if (style === 'input-text-sales') {
    classnames.div = 'flex flex-col font-bold'
    // classnames.input = "py-1 font-light text-[#6B6B6B] mt-3 mb-3  rounded-md shadow-md focus:outline-[#FEBD2F] px-3";
    classnames.input =
      ' mt-3 mb-3 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary'
    inputtype = 'text'
  } else if (style === 'input-date-see') {
    classnames.div = 'flex flex-col font-bold'
    classnames.input =
      'bg-[#E8E8E8] font-light text-[#6B6B6B] mt-3 mb-3 border rounded-md shadow-md outline-4 focus:outline-[#FEBD2F] px-3'
    inputtype = 'date'
  } else if (style === 'input-text-see') {
    classnames.div = 'flex flex-col font-bold'
    classnames.input =
      'bg-[#E8E8E8] font-light text-[#6B6B6B] mt-3 mb-3 border rounded-md shadow-md outline-4 focus:outline-[#FEBD2F] px-3'
    inputtype = 'text'
  } else if (style === 'input-msg-see') {
    classnames.div = 'flex flex-col  resize-none'
    classnames.input =
      'bg-[#E8E8E8] font-light text-[#6B6B6B] mt-3 mb-3 border rounded-md shadow-md outline-4 focus:outline-[#FEBD2F] px-3  h-[375px] resize-none'
  }

  return (
    <div className={`${classnames.div}`}>
      {isMsg ? (
        <>
          <label htmlFor={id} className="font-bold">
            {label}
          </label>
          <textarea
            autoComplete={classnames.autocomplete}
            className={`msg  ${classnames.input}`}
            value={value}
            id={id}
            name={name}
            cols="50"
            rows="20"
            disabled={isDisabled}
            required
          ></textarea>
        </>
      ) : (
        <>
          <label htmlFor={id}>{label}</label>
          <input
            className={`${inputclassSize} ${classnames.input}`}
            type={inputtype}
            name={name}
            id={id}
            required
            autoComplete={classnames.autocomplete}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
          />
        </>
      )}
    </div>
  )
}
