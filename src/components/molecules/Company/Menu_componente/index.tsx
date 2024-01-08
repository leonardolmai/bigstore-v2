import { Calendar } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { api, api2 } from '@/utils/api'
import { Company } from '@/types/companies'
import { getCookie } from 'cookies-next'
import company from '@/app/company/page'

export default function Menu_componente({ screens, alingLists }) {
  const [widthlist, setwidthlist] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])
  const [filterType, setFilterType] = useState<'name' | 'cnpj'>('name')
  const [filterValue, setFilterValue] = useState('')
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api2.get('/companies', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })
        setCompanies(response.data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    fetchCompanies()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist('')
      } else if (screens.isMediumScreen) {
        setwidthlist('')
      } else if (screens.isSmallScreen) {
        setwidthlist('')
      } else if (screens.isNanoScreen) {
        setwidthlist('p-[55px] ')
      } else if (screens.isSmallNanoScreen) {
        setwidthlist('p-8')
      } else {
        setwidthlist('p-20')
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

  const [activeCompanies, setActiveCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchCompanyStatus = async (id) => {
      try {
        const response = await api2.get(`/companies/${id}/`, {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })

        return response.data.is_active
      } catch (error) {
        console.error('Error fetching company information:', error)
        return null
      }
    }

    const fetchActiveCompanies = async () => {
      const activeCompaniesPromises = companies.map((company) => {
        return fetchCompanyStatus(company.id).then((isActive) => {
          return isActive === false ? company : null
        })
      })

      const resolvedCompanies = await Promise.all(activeCompaniesPromises)
      setActiveCompanies(
        resolvedCompanies.filter((company) => company !== null),
      )
    }

    fetchActiveCompanies()
  }, [companies])

  const activateCompany = async (companyj) => {
    try {
      await api2.patch(
        `/companies/${companyj.id}/`,
        {
          id: companyj?.id,
          name: companyj?.name,
          cnpj: companyj?.cnpj,
          website: companyj?.website,
          owner: companyj?.owner,
          is_active: true,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      )
      alert(`Empresa Aprovada com sucesso ${companyj.id}`)
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) => {
          if (company.id === companyj.id) {
            // return { ...company, is_approved: true }
            return { ...company, is_active: true }
          }
          return company
        }),
      )
    } catch (error) {
      console.error('Error activating company:', error)
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
          <option value="name">Nome</option>
          <option value="cnpj">CNPJ</option>
        </select>
      </div>
      <div className={`${alingLists} ${widthlist}`}>
        {filteredCompanies.map((company) => (
          <div
            className="hover:shadow-3xl flex h-[216px] w-[266px] min-w-0 select-none flex-col rounded-3xl bg-[#F5F5F5] p-2 shadow-lg shadow-orange-200 transition-all hover:shadow-orange-500"
            key={company.id}
          >
            <div className="flex justify-center gap-2">
              <Calendar className="stroke-slate-400" />
              <p className="text-slate-400">xx/xx/xxxx</p>
            </div>
            <hr />
            <div>
              <h2 className="font-bold">Nova Empresa</h2>
              <div className="font-light">
                <p>CNPJ: {company.cnpj}</p>
                <p>Nome: {company.name}</p>
                <p>Website: {company.website}</p>
              </div>
              <hr />
              <article className="m-2 mt-5 flex flex-row flex-wrap items-center justify-center gap-5 self-center">
                <div>
                  <input
                    className="w-fit cursor-pointer rounded-md bg-primary px-2 py-2 text-black shadow-md active:bg-primary-dark"
                    type="button"
                    value="Aprovar"
                    onClick={() => activateCompany(company)}
                  />
                </div>
              </article>
            </div>
          </div>
        ))}
        <p className="select-none px-32 text-[#ffffff00]">.</p>
      </div>

      {/* {isFilterEmpty ? <><p> </p></> : <></>} */}
    </>
  )
}
