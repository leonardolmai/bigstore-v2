'use client' // boolforms={boolforms} setBoolForms={setBoolForms}  boolforms, setBoolForms
import { Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import Forms_repayment from './Forms_repayment'

export default function Menu_repayment({ screens, items, alingLists }) {
  const [boolforms, setBoolForms] = useState(false)
  const [widthlist, setwidthlist] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist('')
      } else if (screens.isMediumScreen) {
        setwidthlist('')
      } else if (screens.isSmallScreen) {
        setwidthlist('')
      } else if (screens.isNanoScreen) {
        setwidthlist('p-[55px]')
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

  const handleVerifyClick = () => {
    setBoolForms(true)
  }

  return (
    <div className={`${alingLists} ${widthlist} mb-14`}>
      {boolforms ? (
        <div className="flex h-full w-[266px] min-w-0 flex-col rounded-3xl p-2">
          <Forms_repayment
            boolforms={boolforms}
            setBoolForms={setBoolForms}
            screens={screens}
          />
        </div>
      ) : (
        Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className={`hover:shadow-3xl  flex h-[216px] w-[266px] min-w-0 select-none  flex-col rounded-3xl bg-[#F5F5F5]  p-2 shadow-lg shadow-orange-200 transition-all  hover:shadow-orange-500`}
          >
            <div className="flex justify-center gap-2">
              <Calendar className="stroke-slate-400" />
              <p className="cursor text-slate-400">xx/xx/xx</p>
            </div>
            <hr />
            <div>
              <h2 className="font-bold">
                Protocolo:
                {(() => {
                  const indexString = index.toString()
                  return indexString.length > 1
                    ? indexString.substring(0, 10) + '...'
                    : index
                })()}
              </h2>
              <div className="font-light">
                <p>Id Produto: 1</p>
                <p>
                  Motivo:{' '}
                  {'Porquê'.length > 10
                    ? 'Porquê'.substring(0, 10) + '...'
                    : 'Porquê'}
                </p>
                <p>Data de compra: xx/xx/xx</p>
              </div>
              <hr></hr>
              <article className="m-2 flex flex-row flex-nowrap justify-center gap-2">
                <div
                  className="w-fit cursor-pointer rounded-3xl bg-[#2d7ee7] p-2 text-[#9fc1f4] active:bg-[#1a4a8a]"
                  onClick={handleVerifyClick}
                >
                  <input
                    className="cursor-pointer"
                    type="button"
                    value="Verificar"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-3xl bg-[#6cbe7a83] p-2 text-[#6CBE79] active:bg-[#518f5b]">
                  <input
                    className="cursor-pointer"
                    type="button"
                    value="Aprovar"
                  />
                </div>
                <div className="w-fit cursor-pointer rounded-3xl bg-[#fa480771] p-2 text-[#FA4907] active:bg-[hsl(16,70%,33%)]">
                  <input
                    className="cursor-pointer"
                    type="button"
                    value="Desaprovar"
                  />
                </div>
              </article>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
