import { useState, useEffect } from 'react'
import { api, api2 } from '@/utils/api'
import { getCookie } from 'cookies-next'

export default function Settings_Company({ screens }) {
  const [widthform, setAlingForm] = useState('')
  const [formcase, setFormCase] = useState(false)

  const [companyName, setCompanyName] = useState('await information')
  const [cnpj, setCnpj] = useState('await information')

  useEffect(() => {
    const activecompanyinfo = async () => {
      try {
        const response = await api2.get('/companies/me', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })
        setCompanyName(response.data[0].name)
        setCnpj(response.data[0].cnpj)
      } catch (error) {
        console.error('Error fetching company information:', error)
      }
    }
    activecompanyinfo()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getCookie('typeUser') === 'Bigstore') {
      }

      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]')
      } else {
        setAlingForm('w-[183px]')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleAlterform = () => {
    setFormCase(!formcase)
  }

  const handlePatchCompany = async () => {
    if (typeof window !== 'undefined') {
      try {
        await api2.patch(
          '/companies/1/',
          { name: companyName, cnpj },
          {
            headers: {
              Authorization: `Bearer ${getCookie('token')}`,
            },
          },
        )

        alert('Informação atualizada com sucesso!')
        window.location.href = '/company'
      } catch (error) {
        // Exibir uma mensagem de erro
        alert('Erro em atualizar as informações')
        console.error('Error updating company information:', error)
      }
    }
  }

  return (
    <div className={`${widthform}`}>
      <div className="flex flex-col items-center">
        {formcase ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Nome da empresa</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mb-4 w-fit max-w-[700px] rounded-md border-solid bg-[#FFFFFF] px-2 py-2 focus:outline-[#FEBD2F]  active:outline-[#ffae00]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="mb-4 w-fit max-w-[700px] rounded-md border-solid bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              <button
                className="flex w-fit max-w-[300px] items-center rounded-xl bg-[#8888] pl-2 pr-2 text-black active:bg-black active:text-[#8888]"
                onClick={handleAlterform}
              >
                Voltar
              </button>
              <button
                className="flex w-fit max-w-[300px] items-center rounded-md bg-primary px-1 py-1 text-black shadow-md active:bg-primary-dark active:text-black active:shadow-orange-700"
                onClick={handlePatchCompany}
              >
                Salvar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Nome da empresa</label>
              <input
                type="text"
                value={companyName}
                className="mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#888888]  px-2 py-2 hover:border-black"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                className="mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#888888]  px-2 py-2 hover:border-black"
                disabled
              />
            </div>
            <button
              className="flex w-fit max-w-[300px] items-center rounded-md bg-primary px-1 py-1 text-black shadow-md active:bg-primary-dark active:text-black active:shadow-orange-700"
              onClick={handleAlterform}
            >
              Editar empresa
            </button>
          </>
        )}
      </div>
    </div>
  )
}
