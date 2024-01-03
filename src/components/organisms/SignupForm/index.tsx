'use client'
import { api, api2, api3 } from '@/utils/api'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { FormSubmitButton } from '@/components/atoms/FormSubmitButton'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { FormInput } from '@/components/atoms/FormInput'
import { ButtonGoogle } from '@/components/atoms/ButtonGoogle'

export function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await api3.post('/users/', { name, email, password })

      if (response.status === 201) {
        router.push('/login')
      }
    } catch (error: Error | AxiosError) {
      setEmailError(error.response.data?.email?.[0])
      setEmailError(error.response.data?.email?.[0])
      setPasswordError(error.response.data?.password?.[0])

      if (error.response?.data?.[0] === 'Email address already exists.') {
        router.push('/login')
      } else {
        setGeneralError(error.response?.data?.[0])
      }
    }
  }

  return (
    <section className="flex max-w-7xl flex-col items-center justify-center bg-transparent p-0 sm:w-6/12 sm:bg-gray-200 sm:p-8 md:p-16">
      <h1 className="mb-4 text-2xl font-bold">Cadastrar-se</h1>
      <ButtonGoogle />
      <form onSubmit={handleSignup} className="flex w-full flex-col">
        {generalError && <FormErrorMessage>{generalError}</FormErrorMessage>}
        <FormInput
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        {passwordError && <FormErrorMessage>{passwordError}</FormErrorMessage>}
        <FormSubmitButton>Cadastrar</FormSubmitButton>
      </form>
      <span>
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Faça login
        </Link>
      </span>
    </section>
  )
}
