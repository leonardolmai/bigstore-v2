'use client'
import React, { useState, useEffect } from 'react'
import Home from '@/components/organisms/company/home'
import Product from '@/components/organisms/company/product'
import Employer from '@/components/organisms/company/Employer'
import Settings_Company from '@/components/organisms/company/Settings_Company'
import { useMediaQuery } from 'react-responsive'
import { getCookie, hasCookie, deleteCookie, setCookie } from 'cookies-next'

import {
  UserPlus as MoreCompany,
  UserCog2 as ConfCompany,
  Package2 as Package,
  Receipt,
  Home as Home_page,
  PackagePlus,
  Building2,
  Users,
  SettingsIcon,
} from 'lucide-react'

export default function company() {
  const [activeItem, setActiveItem] = useState(getCookie('activeItem'))
  const [activeNavbar, setActiveNavbar] = useState(getCookie('navbar_company'))
  const [alingLists, setAlingLists] = useState('')
  const [alignNavbar, setAlignNavbar] = useState('')
  const [alignFirstNavbar, setalignFirstNavbar] = useState('')
  const [sizeicons, setSizeIcons] = useState(32)

  const isLargeScreen = useMediaQuery(
    { minWidth: 1100 },
    undefined,
    (matches) => matches,
  )
  const isMediumScreen = useMediaQuery(
    { minWidth: 831 },
    undefined,
    (matches) => matches,
  )
  const isSmallScreen = useMediaQuery(
    { minWidth: 666 },
    undefined,
    (matches) => matches,
  )
  const isNanoScreen = useMediaQuery(
    { minWidth: 356 },
    undefined,
    (matches) => matches,
  )
  const isSmallNanoScreen = useMediaQuery(
    { minWidth: 280 },
    undefined,
    (matches) => matches,
  )

  // tipo de usuario
  const type = 'typeUser'
  const position_navbar = 'navbar_company'

  useEffect(() => {
    if (hasCookie('token') === true) {
      if (typeof window !== 'undefined') {
        if (getCookie(type) === 'Customer') {
          window.location.href = '/'
        }
        if (hasCookie('navbar_company') === false) {
          if (
            (getCookie(type) === 'Bigstore' ||
              getCookie(type) === 'Employee (Bigstore)') == true
          ) {
            setCookie('navbar_company', '0')
            if (hasCookie('activeiItem') === false) {
              setCookie('activeItem', '0')
            }
          } else {
            if (
              getCookie(type) === 'Employee' ||
              getCookie(type) === 'Company'
            ) {
              setCookie('navbar_company', '1')
              window.location.href = '/company'
            }
          }

          deleteCookie('position')
        }
      } else {
        window.location.href = '/login'
      }
      if (isLargeScreen) {
        setAlignNavbar('flex flex-col w-32')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(32)
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-4 gap-5 m-2',
        )
      } else if (isMediumScreen) {
        setAlignNavbar('flex flex-col w-24')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(28)
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-3 gap-5 m-2',
        )
      } else if (isSmallScreen) {
        setAlignNavbar('flex flex-row pl-12 pr-12 ')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(24)
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-2 gap-5 m-2',
        )
      } else if (isNanoScreen) {
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(18)
        setAlingLists(
          activeItem === '1'
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      } else if (isSmallNanoScreen) {
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(16)
        setAlingLists(
          activeItem === '1'
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      } else {
        setAlignNavbar(8)
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setAlingLists(
          activeItem === '1'
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      }
    }
  }, [
    activeItem,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isNanoScreen,
    isSmallNanoScreen,
  ])

  const handleItemClick = (index) => {
    if (typeof window !== 'undefined') {
      setCookie('activeItem', index)

      //
      window.location.href = '/company'
      // setActiveItem(index);
    }
  }

  const handleNavbarClick = (index) => {
    if (typeof window !== 'undefined') {
      setCookie('navbar_company', index)
      window.location.href = '/company'
    }
  }
  const isItemActive = (index) => {
    return index === activeItem
      ? 'text-[#FA4907] border-[#FA4907] '
      : 'text-black border-black hover:text-[#3676ff] pt-22  hover:border-[#3676ff] '
  }

  return (
    <div className={`${alignFirstNavbar}`}>
      <div
        className={` items-center justify-center border-2 bg-[#ffffffab] pb-6 pt-6 ${alignNavbar} `}
      >
        <div
          className={` items-center justify-center gap-6 break-words text-center ${alignNavbar} `}
        >
          <div
            className={`ustify-center items-center ${
              isLargeScreen === true || isMediumScreen === true
                ? alignNavbar
                : 'hidden'
            } `}
          >
            <Building2 size={40} className="stroke-[#FA4907] " />
            <h1 className="break-all">Empresa</h1>
          </div>

          {getCookie(type) == 'Bigstore' ||
          getCookie(type) == 'Employee (Bigstore)' ? (
            <>
              <div
                className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar} `}
              >
                <Home_page
                  className="hover:cursor-pointer hover:stroke-[#FA4907] "
                  size={sizeicons}
                  onClick={() => handleNavbarClick('0')}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {getCookie(type) === 'Bigstore' ||
          getCookie(type) === 'Employee (Bigstore)' ||
          getCookie(type) === 'Company' ||
          getCookie(type) === 'Employee' ? (
            <>
              <div
                className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
              >
                <PackagePlus
                  className="hover: cursor-pointer hover:stroke-[#FA4907]"
                  size={sizeicons}
                  onClick={() => handleNavbarClick('1')}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {getCookie(type) === 'Bigstore' || getCookie(type) === 'Company' ? (
            <>
              <div
                className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
              >
                <Users
                  className="hover: cursor-pointer hover:stroke-[#FA4907]"
                  size={sizeicons}
                  onClick={() => handleNavbarClick('2')}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {getCookie(type) === 'Bigstore' || getCookie(type) === 'Company' ? (
            <>
              <div
                className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
              >
                <SettingsIcon
                  className="hover: cursor-pointer hover:stroke-[#FA4907]"
                  size={sizeicons}
                  onClick={() => handleNavbarClick('3')}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div></div>
      </div>
      <div className="mb-20 mt-24 flex flex-1 justify-center">
        <div className="flex h-full min-h-[683px] w-[1244px] max-w-max flex-col rounded-3xl bg-[#febc2f36]">
          {activeNavbar !== '1' &&
          activeNavbar !== '2' &&
          activeNavbar !== '3' &&
          activeNavbar !== '4' &&
          hasCookie('navbar_company') &&
          (getCookie(type) === 'Bigstore' ||
            getCookie(type) == 'Employee (Bigstore)') ? (
            <>
              {' '}
              <nav>
                <div className="m-1 flex flex-row justify-between p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <div
                    className={`${isItemActive('0')}`}
                    onClick={() => handleItemClick(0)}
                  >
                    <div className="flex cursor-pointer flex-row gap-2">
                      <MoreCompany size={24} />
                      {isSmallScreen && <p> Novas Empresas</p>}
                    </div>
                    {isSmallScreen && (
                      <hr
                        className={`mb-2 mt-2 border-2 pt-24${isItemActive(
                          '0',
                        )}`}
                      />
                    )}
                  </div>
                  <div
                    className={`${isItemActive('1')} p-22`}
                    onClick={() => handleItemClick(1)}
                  >
                    <div className="flex cursor-pointer flex-row gap-2">
                      <ConfCompany size={24} />
                      {isSmallScreen && <p> Empresas</p>}
                    </div>
                    {isSmallScreen && (
                      <hr
                        className={`mb-2 mt-2 border-2 ${isItemActive('1')}`}
                      />
                    )}
                  </div>
                  <div
                    className={`${isItemActive('2')}`}
                    onClick={() => handleItemClick(2)}
                  >
                    <div className="flex cursor-pointer flex-row gap-2">
                      <Package size={24} />
                      {isSmallScreen && <p> Novos Produtos</p>}
                    </div>
                    {isSmallScreen && (
                      <hr
                        className={`mb-2 mt-2 border-2 ${isItemActive('2')}`}
                      />
                    )}
                  </div>
                  <div
                    className={`${isItemActive('3')}`}
                    onClick={() => handleItemClick(3)}
                  >
                    <div className="flex cursor-pointer flex-row gap-2">
                      <Receipt size={24} />
                      {isSmallScreen && <p> Produtos</p>}
                    </div>
                    {isSmallScreen && (
                      <hr
                        className={`mb-2 mt-2 border-2 ${isItemActive('3')}`}
                      />
                    )}
                  </div>
                  <div
                    className={`${isItemActive('4')}`}
                    onClick={() => handleItemClick(4)}
                  >
                    <div className="flex cursor-pointer flex-row gap-2">
                      <Receipt size={24} />
                      {isSmallScreen && <p> Reembolso</p>}
                    </div>
                    {isSmallScreen && (
                      <hr
                        className={`mb-2 mt-2 border-2 ${isItemActive('4')}`}
                      />
                    )}
                  </div>
                </div>
              </nav>
              <Home
                activeItem={activeItem}
                screens={{
                  isLargeScreen,
                  isMediumScreen,
                  isSmallScreen,
                  isNanoScreen,
                  isSmallNanoScreen,
                }}
              />
            </>
          ) : (
            ''
          )}
          {activeNavbar === '1' &&
          hasCookie('navbar_company') &&
          (getCookie(type) === 'Bigstore' ||
            getCookie(type) === 'Employee (Bigstore)' ||
            getCookie(type) === 'Company' ||
            getCookie(type) === 'Employee') ? (
            <>
              <nav>
                <div className="m-1 flex h-fit flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Cadastro de Produto</p>
                </div>
              </nav>
              <Product
                screens={{
                  isLargeScreen,
                  isMediumScreen,
                  isSmallScreen,
                  isNanoScreen,
                  isSmallNanoScreen,
                }}
              />
            </>
          ) : (
            ''
          )}
          {activeNavbar === '2' &&
          hasCookie('navbar_company') &&
          (getCookie(type) === 'Bigstore' || getCookie(type) === 'Company') ? (
            <>
              <nav>
                <div className="m-1 flex h-fit flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Funcionários</p>
                </div>
              </nav>
              <Employer
                screens={{
                  isLargeScreen,
                  isMediumScreen,
                  isSmallScreen,
                  isNanoScreen,
                  isSmallNanoScreen,
                }}
              />
            </>
          ) : (
            ''
          )}
          {activeNavbar === '3' &&
          hasCookie('navbar_company') &&
          (getCookie(type) === 'Bigstore' || getCookie(type) === 'Company') ? (
            <>
              <nav>
                <div className="m-1 flex  flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Configurações da Empresa</p>
                </div>
              </nav>
              <Settings_Company
                screens={{
                  isLargeScreen,
                  isMediumScreen,
                  isSmallScreen,
                  isNanoScreen,
                  isSmallNanoScreen,
                }}
              />
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
