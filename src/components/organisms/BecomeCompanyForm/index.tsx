'use client'
import axios, { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { api, api2, api3 } from '@/utils/api'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormSubmitButton } from '@/components/atoms/FormSubmitButton'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { FormInput } from '@/components/atoms/FormInput'

export function BecomeCompanyForm() {
  const [name, setName] = useState('')
  const [cnpj, setCNPJ] = useState('')
  const [nameError, setNameError] = useState('')
  const [cnpjError, setCNPJError] = useState('')
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()

  const handleBecomeCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const token = getCookie('token')

    alert(token)

    try {
      // const response = await api.post(
      //   '/2/companies/',
      //   {
      //     name,
      //     cnpj,
      //   },
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   },
      // )
      const response = await api3.post(
        '/companies/',
        {
          name,
          cnpj,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Access-Control-Allow-Origin': '*',
          },
        },
      )

      router.push('/')
    } catch (error: Error | AxiosError) {
      setNameError(error.response.data?.name)
      setCNPJError(error.response.data?.cnpj)
      setGeneralError(error.response.data?.[0])
    }
  }

  return (
    <section className="flex max-w-7xl flex-col items-center justify-center bg-transparent p-0 sm:w-6/12 sm:bg-gray-200 sm:p-8 md:p-16">
      <h1 className="mb-4 text-2xl font-bold">Tornar-se empresa</h1>
      <form onSubmit={handleBecomeCompany} className="flex w-full flex-col">
        {generalError && <FormErrorMessage>{generalError}</FormErrorMessage>}
        <FormInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da empresa"
        />
        {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
        <FormInput
          type="text"
          value={cnpj}
          onChange={(e) => setCNPJ(e.target.value)}
          placeholder="CNPJ"
        />
        {cnpjError && <FormErrorMessage>{cnpjError}</FormErrorMessage>}
        <FormSubmitButton>Confirmar</FormSubmitButton>
      </form>
    </section>
  )
}
