'use client'
import React, { useEffect, useState } from 'react'
import Menu_componente from '@/components/molecules/Company/Menu_componente/'
import Menu_company from '@/components/molecules/Company/Menu_Company'
import Menu_Products from '@/components/molecules/Company/Menu_Products'
import Menu_Products_Approved from '@/components/molecules/Company/Menu_Products_Approved'
import Menu_repayment from '@/components/molecules/Company/Menu_repayment'

export default function Home({ activeItem, screens }) {
  const [alingLists, setAlingLists] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-4 gap-5 m-2',
        )
      } else if (screens.isMediumScreen) {
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-3 gap-5 m-2',
        )
      } else if (screens.isSmallScreen) {
        setAlingLists(
          activeItem === '1' ? 'flex flex-col' : 'grid grid-cols-2 gap-5 m-2',
        )
      } else {
        setAlingLists(
          activeItem === '1'
            ? 'flex flex-col'
            : 'flex flex-col justify-center gap-3 items-center',
        )
      }
    }
  }, [
    activeItem,
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  return (
    <div>
      {activeItem === '0' && (
        <Menu_componente screens={screens} alingLists={alingLists} />
      )}
      {activeItem === '1' && (
        <Menu_company screens={screens} items={20} alingLists={alingLists} />
      )}
      {activeItem === '2' && (
        <Menu_Products screens={screens} items={20} alingLists={alingLists} />
      )}
      {activeItem === '3' && (
        <Menu_Products_Approved
          screens={screens}
          items={20}
          alingLists={alingLists}
        />
      )}
      {activeItem === '4' && (
        <Menu_repayment screens={screens} items={20} alingLists={alingLists} />
      )}
    </div>
  )
}
