import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { getCookie } from 'cookies-next'

export default function Employer_forms({ screens, setBoolForms, companyId }) {
  const [email, setEmail] = useState('')

  const [alingForm, setAlingForm] = useState('')
  const [formInput, setFormInput] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]')
        setFormInput('w-[700px] h-[300px]')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]')
        setFormInput('w-[600px] h-[300px]')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]')
        setFormInput('w-[500px] h-[300px]')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]')
        setFormInput('w-[200px] h-[300px]')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]')
        setFormInput('w-60')
      } else {
        setAlingForm('w-[183px]')
        setFormInput('w-60')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleInputChange = (e) => {
    setEmail(e.target.value)
  }

  const handleAddEmployee = async () => {
    try {
      await api.post(
        `/companies/${companyId}/employees/`,
        { email },
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )

      alert('Funcionário Cadastrado com sucesso')
      window.location.href = '/company'
    } catch (error) {
      alert('Erro, Usuário não pode ser cadastrado')
    }
  }

  const handleBackClick = () => {
    setBoolForms(false)
  }

  return (
    <div className={`${alingForm} flex flex-col justify-center self-center`}>
      <form className="flex flex-col items-center justify-center gap-6">
        <input
          className="w-full max-w-[400px] rounded-md bg-white px-2 py-2 focus:outline-[#FEBD2F]"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email do funcionário"
          required
        />
        <div className="flex flex-row flex-wrap gap-10">
          <button
            className="rounded-md bg-[#FEBD2F] p-1 px-2 py-2 active:bg-primary-dark active:text-black"
            type="button"
            onClick={handleAddEmployee}
          >
            Adicionar Funcionário
          </button>
          <button
            className="rounded-md bg-slate-200 p-1 px-2 py-2 active:bg-black active:text-white"
            onClick={handleBackClick}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  )
}
