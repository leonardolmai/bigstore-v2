import { useState, useEffect, useMemo } from 'react'
import { api } from '@/utils/api'
import { UserCompany } from '@/types/usercompany'
import { BadgeX as Badge, PlusCircle } from 'lucide-react'
import Employer_forms from './Employer_forms'
import { getCookie } from 'cookies-next'

const useFetchEmployees = (companyId: number) => {
  const [employees, setEmployees] = useState<UserCompany[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(`/companies/${companyId}/employees`, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        })
        setEmployees(response.data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()
  }, [companyId])

  return employees
}

export default function Employer({ screens }) {
  const [boolforms, setBoolForms] = useState(false)
  const [widthlist, setwidthlist] = useState('')
  const [companyId, setCompanyId] = useState<number | null>(null) // Esperando atualização para /companie/me

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/me`, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        })
        setCompanyId(response.data[0].id)
      } catch (error) {
        console.error('Error fetching company:', error)
      }
    }

    fetchCompany()
  }, [])

  const handleDelete = async (email: string) => {
    try {
      await api.delete(`/companies/${companyId}/employees`, {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
        data: {
          email,
        },
      })
      window.location.href = '/company'
      setEmployees((prevEmployees) =>
        prevEmployees.filter((user) => user.email !== email),
      )
    } catch (error) {
      console.error('Error deleting employee:', error)
    }
  }

  const employees = useFetchEmployees(companyId)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist('w-56')
      } else if (screens.isMediumScreen) {
        setwidthlist('w-44 self-center items-center')
      } else if (screens.isSmallScreen) {
        setwidthlist(
          'w-28  flex flex-col text-xs break-all self-center items-center',
        )
      } else if (screens.isNanoScreen) {
        setwidthlist(
          'w-[70px] flex flex-col text-xs break-all justif  self-center items-center',
        )
      } else if (screens.isSmallNanoScreen) {
        setwidthlist(
          'w-[44px] flex flex-col  text-xs break-all justif  self-center items-center',
        )
      } else {
        setwidthlist(
          'w-[33px] flex flex-col  text-xs break-all justif  self-center items-center',
        )
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleformClick = () => {
    if (typeof window !== 'undefined') {
      setBoolForms(true)
    }
  }

  return (
    <div className={`select-none`}>
      {boolforms ? (
        <Employer_forms
          screens={screens}
          setBoolForms={setBoolForms}
          companyId={companyId || 1}
        />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <label className="font-bold">Adicionar novo funcionário</label>
            <PlusCircle
              onClick={handleformClick}
              size={24}
              className="h-8 w-full max-w-[350px] cursor-pointer rounded-lg bg-[#FEBD2F] pb-1 pt-1 active:bg-[#8d691a] active:stroke-amber-950"
            />
          </div>
          <div
            className={`m-2 flex  flex-row items-start justify-between rounded-t-xl bg-[#ffffff] p-2`}
          >
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Id</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Nome</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Email</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Telefone</p>
            </div>
            <div className={`flex justify-center ${widthlist} cursor-default`}>
              <p>Remover</p>
            </div>
          </div>
          {employees.map((user, index) => (
            <div key={user.id}>
              <div
                className={`m-2 flex flex-row p-2 ${
                  index % 2 == 0 ? 'bg-[#F5F6F7]' : 'bg-[#b8b8b8]'
                } hover:shadow-3xl items-start justify-between rounded-md shadow-lg shadow-orange-200 transition-all hover:shadow-orange-500`}
              >
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.id}</p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>
                    {user.name.length > 15
                      ? user.name.substring(0, 15) + '...'
                      : user.name}
                  </p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.email}</p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.phone}</p>
                  <p>{user.phone.length < 1 ? 'Sem número' : user.phone}</p>
                </div>
                <div
                  className={`flex justify-center ${widthlist} cursor-pointer`}
                >
                  {user.id === 1 ? (
                    <></>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="flex cursor-pointer flex-row items-center    justify-center rounded-xl bg-primary active:bg-red-600 active:ring-4"
                      >
                        <p>
                          <Badge color={'black'} />
                        </p>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
