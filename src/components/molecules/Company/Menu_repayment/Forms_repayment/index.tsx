'use client'
import { useState, useEffect } from 'react'
import InputField from '@/components/atoms/inputs'
import CarouselComponent from '@/components/organisms/carousel'

// label, name, id, style, size, value, onChange
export default function Forms_repayment({ boolforms, setBoolForms, screens }) {
  const [modifypage, setModifyPage] = useState('')
  const [modifymsg, setModifymsg] = useState('')
  const [modifysizeinput, selfmodifysizeinput] = useState('')
  const handleVerifyClick = () => {
    setBoolForms(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setModifyPage('  ml-40')
        setModifymsg('w-[800px] h-[375px]')
        selfmodifysizeinput('large')
      } else if (screens.isMediumScreen) {
        setModifymsg('w-[550px] h-[375px]')
        selfmodifysizeinput('small')
      } else if (screens.isSmallScreen) {
        setModifymsg('w-[320px] h-[375px]')
        selfmodifysizeinput('small')
      } else if (screens.isNanoScreen) {
        setModifyPage('flex-col ml-2  justify-start self-start ')
        setModifymsg('w-[270px] h-[575px]')
        selfmodifysizeinput('small')
      } else if (screens.isSmallNanoScreen) {
        setModifyPage('flex-col ml-1  justify-start self-start ')
        setModifymsg('w-[170px] h-[475px]')
        selfmodifysizeinput('small')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  return (
    <div>
      <form
        className={`flex w-fit flex-col-reverse ${modifypage} h-full self-auto object-center  `}
      >
        <div className="flex flex-row flex-wrap self-center">
          <div className=" w-fit cursor-pointer rounded-3xl  p-2 active:bg-[#7a7a7a]">
            <input
              className="cursor-pointer"
              type="button"
              value="Voltar"
              onClick={handleVerifyClick}
            />
          </div>
          <div className="w-fit cursor-pointer rounded-3xl bg-[#6cbe7a83] p-2 text-[#6CBE79] active:bg-[#518f5b]">
            <input className="cursor-pointer" type="button" value="Aprovar" />
          </div>
          <div className="w-fit cursor-pointer rounded-3xl bg-[#fa480771] p-2 text-[#FA4907] active:bg-[hsl(16,70%,33%)]">
            <input
              className="cursor-pointer"
              type="button"
              value="Desaprovar"
            />
          </div>
        </div>

        <div className="flex flex-col   flex-wrap-reverse">
          <div className="flex flex-row flex-wrap justify-center gap-6 ">
            <InputField
              label="Nome"
              name="form_product"
              id="form_product"
              style="input-text-see"
              size={modifysizeinput}
              value="Nome"
              onChange={null}
            />
            <InputField
              label="Email"
              name="form_product"
              id="form_product"
              style="input-text-see"
              size={modifysizeinput}
              value="example@example.com"
              onChange={null}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-6 ">
            <InputField
              label="Id Produto"
              name="form_product1"
              id="form_product1"
              style="input-text-see"
              size={modifysizeinput}
              value="1"
              onChange={null}
            />
            <InputField
              label="Nome do Produto"
              name="form_product1"
              id="form_product1"
              style="input-text-see"
              size={modifysizeinput}
              value="Produto 1"
              onChange={null}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-6 ">
            <InputField
              label="Quatidade"
              name="form_product3"
              id="form_produc3"
              style="input-text-see"
              size="small"
              value="1"
              onChange={null}
            />
            <InputField
              label="Preço unitário"
              name="form_produc4"
              id="form_product4"
              style="input-text-see"
              value={'1'.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              size="small"
              onChange={null}
            />
            <InputField
              label="Categoria"
              name="form_produc4"
              id="form_product4"
              style="input-text-see"
              value="electronics"
              size="small"
              onChange={null}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-3 ">
            <InputField
              label="Data de compra"
              name="form_product2"
              id="form_product2"
              style="input-date-see"
              size="small"
              value="xx/xx/xxxx"
              onChange={null}
            />
            <InputField
              label="Protocolo"
              name="form_product2"
              id="form_product2"
              style="input-date-see"
              size="small"
              value="xx/xx/xxxx"
              onChange={null}
            />
          </div>
          <div className="flex flex-row flex-wrap justify-center gap-3 ">
            <textarea
              className={`msg mb-3 mt-3 rounded-md border bg-[#E8E8E8] px-3 font-light text-[#6B6B6B] shadow-md outline-4 focus:outline-[#FEBD2F]   ${modifymsg}  resize-none`}
              id="123"
              name="123"
              cols="50"
              rows="20"
              disabled={true}
              required
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at vulputate mi, vel elementum dolor. Sed vehicula risus odio, at aliquet nulla dapibus id. Ut dictum pellentesque laoreet. Phasellus porttitor, risus ac laoreet viverra, nisi lectus faucibus orci, eget consectetur eros lectus ut tellus. Aliquam erat volutpat. Curabitur pretium tellus diam, ut sodales tellus vehicula quis. Pellentesque euismod quis libero eu malesuada. Donec vitae dictum libero, et pharetra lorem. Etiam id tempus augue. Integer scelerisque enim sit amet neque sagittis, vel aliquet eros bibendum. Sed lobortis porta sagittis. Fusce ut lacus arcu. Donec velit est, vulputate et consectetur vel, dictum sodales diam. Nunc laoreet erat in nisl lobortis, sed bibendum neque facilisis. Proin facilisis pellentesque ipsum, et molestie tortor bibendum dignissim. Integer fermentum, neque in eleifend sollicitudin, libero enim dignissim lectus, ut tincidunt neque elit sed tortor."
            ></textarea>
          </div>
        </div>

        <div className=" flex w-full flex-row    justify-center  ">
          <h1 className="rounded-3xl bg-[#c7c7c7] p-2">Reembolso</h1>
        </div>
      </form>
    </div>
  )
}
