'use client'
import React, { useState, useEffect } from 'react'
import User from '@/components/organisms/Account/User'
import Product from '@/components/organisms/Account/Product'
import UserCardsWrapper from '@/components/organisms/Account/User_Cards'
import UserAddressesWrapper from '@/components/organisms/Account/Address'
import { useMediaQuery } from 'react-responsive'
import { hasCookie, getCookie, setCookie, deleteCookie } from 'cookies-next'
import {
  Award,
  User as Usericon,
  CreditCard as Cards,
  UserCog2 as ConfCompany,
  Package2 as Package,
  MapPin as Addresses,
  LogOutIcon,
} from 'lucide-react'

export default function company() {
  const [activeItem, setActiveItem] = useState(0)
  const [activeNavbar, setActiveNavbar] = useState(getCookie('position'))
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (hasCookie('token') === false) {
        if (hasCookie('position')) {
          deleteCookie('position')
        }
        window.location.href = '/login'
      } else if (hasCookie('token') !== false) {
        if (hasCookie('position') === false) {
          setCookie('position', '0')
        }
      }
      if (getCookie('position') === '4') {
        deleteCookie('position')
        // deleteCookie('typeUser')
        // deleteCookie('token')
        window.location.href = '/api/auth/logout'
      }

      if (isLargeScreen) {
        setAlignNavbar('flex flex-col w-32')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(32)
        setAlingLists(
          activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-4 gap-5 m-2',
        )
      } else if (isMediumScreen) {
        setAlignNavbar('flex flex-col w-24')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(28)
        setAlingLists(
          activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-3 gap-5 m-2',
        )
      } else if (isSmallScreen) {
        setAlignNavbar('flex flex-row pl-12 pr-12 ')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(24)
        setAlingLists(
          activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-2 gap-5 m-2',
        )
      } else if (isNanoScreen) {
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(18)
        setAlingLists(
          activeItem === 1
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      } else if (isSmallNanoScreen) {
        setAlignNavbar('flex flex-row ')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(16)
        setAlingLists(
          activeItem === 1
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      } else {
        setAlignNavbar('flex flex-row ')
        setAlingLists(
          activeItem === 1
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

  const handleItemClick = (index: number) => {
    setActiveItem(index)
  }

  const handleNavbarClick = (index: String) => {
    if (typeof window !== 'undefined') {
      setCookie('position', index)
      window.location.href = '/account'
    }
  }
  const isItemActive = (index: number) => {
    return index === activeItem
      ? 'text-[#FA4907] border-[#FA4907] '
      : 'text-black border-black hover:text-[#3676ff] pt-22  hover:border-[#3676ff] '
  }

  return (
    <div className={`${alignFirstNavbar}`}>
      {hasCookie('token') && hasCookie('typeUser') ? (
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
              <Award size={40} className="stroke-[#FA4907] " />
              <h1 className="break-all font-bold">Conta</h1>
            </div>
            <div
              className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar} `}
            >
              <Usericon
                className="hover:cursor-pointer hover:stroke-[#FA4907] "
                size={sizeicons}
                onClick={() => handleNavbarClick('0')}
              />
            </div>
            <div
              className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
            >
              <Package
                className="hover: cursor-pointer hover:stroke-[#FA4907]"
                size={sizeicons}
                onClick={() => handleNavbarClick('1')}
              />
            </div>
            <div
              className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
            >
              <Cards
                className="hover: cursor-pointer hover:stroke-[#FA4907]"
                size={sizeicons}
                onClick={() => handleNavbarClick('2')}
              />
            </div>
            <div
              className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
            >
              <Addresses
                className="hover: cursor-pointer hover:stroke-[#FA4907]"
                size={sizeicons}
                onClick={() => handleNavbarClick('3')}
              />
            </div>
            <div
              className={` items-center justify-center  break-words pb-6  pt-6 text-center ${alignNavbar}`}
            >
              <LogOutIcon
                color="red"
                className="hover: cursor-pointer hover:stroke-[#FA4907]"
                size={sizeicons}
                onClick={() => handleNavbarClick('4')}
              />
            </div>
          </div>

          <div></div>
        </div>
      ) : (
        <></>
      )}

      <div className="mb-20 mt-24 flex flex-1 justify-center">
        <div className="flex h-full min-h-[683px] w-[1244px] max-w-max flex-col rounded-3xl bg-[#febc2f36]  shadow">
          {activeNavbar !== '1' &&
          activeNavbar !== '2' &&
          activeNavbar !== '3' &&
          hasCookie('position') ? (
            <>
              {/* <nav>
              <div className="flex flex-row font-sans justify-between pl-3 pr-3 p-2 m-1 text-lg font-bold">
                <div className={`${isItemActive(0)}`} onClick={() => handleItemClick(0)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Usericon size={24} />
                    {isSmallScreen && <p> Account Data</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 pt-24${isItemActive(0)}`} />}
                </div>
                <div className={`${isItemActive(1)} p-22`} onClick={() => handleItemClick(1)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Cards size={24} />
                    {isSmallScreen && <p> Cards</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(1)}`} />}
                </div>
                <div className={`${isItemActive(2)}`} onClick={() => handleItemClick(2)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Addresses size={24} />
                    {isSmallScreen && <p> Addresses</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(2)}`} />}
                </div>
                <div className={`${isItemActive(3)}`} onClick={() => handleItemClick(3)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Package size={24} />
                    {isSmallScreen && <p> Products</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(3)}`} />}
                </div>
              </div>
            </nav> */}
              <User
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
          {activeNavbar === '1' ? (
            <>
              <nav>
                <div className="m-1 flex h-fit flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Meus pedidos</p>
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
          {activeNavbar === '2' ? (
            <>
              <nav>
                <div className="m-1 flex h-fit flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Cartões</p>
                </div>
              </nav>
              <UserCardsWrapper
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
          {activeNavbar === '3' ? (
            <>
              <nav>
                <div className="m-1 flex  flex-row justify-center p-2 pl-3 pr-3 font-sans text-lg font-bold">
                  <p>Endereços</p>
                </div>
              </nav>
              <UserAddressesWrapper
                screens={{
                  isLargeScreen,
                  isMediumScreen,
                  isSmallScreen,
                  isNanoScreen,
                  isSmallNanoScreen,
                }}
              />
              {/* <Product screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} /> */}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
