import { BadgeX as Badge, Calendar } from 'lucide-react'

import React, { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { Company } from '@/types/companies'
import { getCookie } from 'cookies-next'

export default function Menu_componente({ screens, alingLists }) {
  const [widthlist, setwidthlist] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [filterType, setFilterType] = useState<'name' | 'cnpj'>('name')
  const [filterValue, setFilterValue] = useState('')
  const [activeCompanies, setActiveCompanies] = useState<Company[]>([])
  const [listPosition, setListPosition] = useState(0) // Inicializa o contador com 0
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/companies', {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        })
        setCompanies(response.data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    fetchCompanies()

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
          'w-[70px] flex flex-col text-xs break-all justif self-center items-center',
        )
      } else if (screens.isSmallNanoScreen) {
        setwidthlist(
          'w-[44px] flex flex-col text-xs break-all justif self-center items-center',
        )
      } else {
        setwidthlist(
          'w-[33px] flex flex-col text-xs break-all justif self-center items-center',
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

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterType(event.target.value as 'name' | 'cnpj')
    setFilterValue('')
  }

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFilterValue(event.target.value)
  }

  const fetchCompanyStatus = async (id) => {
    try {
      const response = await api.get(`/companies/${id}/`, {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
      })

      return response.data.is_active
    } catch (error) {
      console.error('Error fetching company information:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchActiveCompanies = async () => {
      const activeCompaniesPromises = companies.map((company) => {
        return fetchCompanyStatus(company.id).then((isActive) => {
          return isActive !== false ? company : null
        })
      })

      const resolvedCompanies = await Promise.all(activeCompaniesPromises)
      setActiveCompanies(
        resolvedCompanies.filter((company) => company !== null),
      )
    }

    fetchActiveCompanies()
  }, [companies])

  const revokeCompany = async (companyj) => {
    try {
      await api.patch(
        `/companies/${companyj.id}/`,
        {
          is_active: false,
        },
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => {
          if (company.id === companyj.id) {
            return { ...company, is_active: false }
          }
          return company
        }),
      )

      alert(`Empresa revogada com sucesso: ${companyj.id}`)
    } catch (error) {
      console.error('Error revoking company:', error)
    }
  }

  useEffect(() => {
    const filterCompanies = () => {
      if (filterType === 'name') {
        setFilteredCompanies(
          activeCompanies.filter((company) =>
            company.name.toLowerCase().includes(filterValue.toLowerCase()),
          ),
        )
      } else if (filterType === 'cnpj') {
        setFilteredCompanies(
          activeCompanies.filter((company) =>
            company.cnpj.includes(filterValue),
          ),
        )
      }
    }

    filterCompanies()
  }, [filterValue, filterType, activeCompanies])
  return (
    <>
      <div className="flex flex-row justify-center gap-6">
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterValueChange}
          placeholder={filterType === 'name' ? 'Nome' : 'CNPJ'}
          className="w-min-full w-fit items-center rounded-md border border-gray-400 p-2 outline-none focus:border-primary"
        />
        <select
          name="filterType"
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
          className="w-fit rounded-md border border-primary-dark bg-primary p-2 font-semibold outline-none"
        >
          <option value="name">Name</option>
          <option value="cnpj">CNPJ</option>
        </select>
      </div>
      <div className={`${alingLists} select-none `}>
        <div
          className={`m-2 flex  flex-row items-start   justify-between rounded-t-xl bg-[#ffffff] p-2`}
        >
          <div className={`flex justify-center   ${widthlist}  border-e-2 `}>
            <p>Nome</p>
          </div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}>
            <p>CNPJ</p>
          </div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}>
            <p>Website</p>
          </div>
          <div className={`flex justify-center ${widthlist}  cursor-default `}>
            <p>Apagar</p>
          </div>
        </div>
        {filteredCompanies.map((company, index) => (
          <div
            className={`m-2 flex flex-row p-2 ${
              index % 2 === 0 ? 'bg-[#F5F6F7]' : 'bg-[#b8b8b8]'
            } hover:shadow-3xl items-start justify-between rounded-md shadow-lg shadow-orange-200 transition-all hover:shadow-orange-500`}
            key={company.id}
          >
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>{company.name}</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>{company.cnpj}</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>{company.website || 'N/A Dominio'}</p>
            </div>

            <div className={`flex justify-center ${widthlist} cursor-pointer`}>
              {company.cnpj === '00000000000000' ? (
                <></>
              ) : (
                <>
                  <Badge
                    stroke={'red'}
                    onClick={() => revokeCompany(company)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
