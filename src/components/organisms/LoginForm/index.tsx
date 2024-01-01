'use client'
import { setCookie } from 'cookies-next'
import { api, api2 } from '@/utils/api'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ButtonGoogle } from '@/components/atoms/ButtonGoogle'
import { FormSubmitButton } from '@/components/atoms/FormSubmitButton'
import { FormErrorMessage } from '@/components/atoms/FormErrorMessage'
import { FormInput } from '@/components/atoms/FormInput'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)

      const response = await api.post('/2/token/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // eslint-disable-next-line camelcase
      const { access_token } = response.data
      console.log(access_token)

      setCookie('token', access_token, { maxAge: 60 * 60 * 24 * 30 })
      // const {
      //   data: { type },
      // } = await api.get('/2/users/type/', {
      //   headers: {
      //     Authorization: `Bearer ${access_token}`,
      //     // payload: '',
      //   },
      // })
      const {
        data: { type },
      } = await api2.get('/users/type/', {
        headers: {
          // eslint-disable-next-line camelcase
          Authorization: `Bearer ${access_token}`,
        },
      })

      setCookie('typeUser', type, { maxAge: 60 * 60 * 24 * 30 })
      router.push('/')
    } catch (error: Error | AxiosError) {
      console.log('jkjjjajdje')

      console.log(error)
      setEmailError(error.response.data?.username)
      setPasswordError(error.response.data?.password)
      setGeneralError(error.response.data?.detail)
    }
  }

  return (
    <section className="flex max-w-7xl flex-col items-center justify-center bg-transparent p-0 sm:w-6/12 sm:bg-gray-200 sm:p-8 md:p-16">
      <h1 className="mb-4 text-2xl font-bold">Entrar</h1>
      <ButtonGoogle />
      <form onSubmit={handleLogin} className="flex w-full flex-col">
        {generalError && <FormErrorMessage>{generalError}</FormErrorMessage>}
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
        <FormSubmitButton>Entrar</FormSubmitButton>
      </form>
      <span>
        Não tem uma conta?{' '}
        <Link
          href="/signup"
          className="text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Cadastre-se
        </Link>
      </span>
    </section>
  )
}
