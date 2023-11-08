'use client'
import { useState, useEffect } from 'react'
import { B_carousel } from '@/components/atoms/buttons'
import { getCookie, setCookie } from 'cookies-next'
import { api } from '@/utils/api'
import { Product } from '@/types/product'

// label, name, id, style, size, value, onChange
export default function Forms_Product({ screens }) {
  const [modifypage, setModifyPage] = useState('')
  const [modifycarousel, setModifycarousel] = useState('')
  const [modifymsg, setModifymsg] = useState('')
  const [modifysizeinput, selfmodifysizeinput] = useState('')
  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [cnpjCompany, setCnpjCompany] = useState('await...')
  const [created_by, setCreatedBy] = useState('await...')

  const handleVerifyClick = () => {
    setCookie('boolform', false)
    window.location.href = '/company'
  }

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await api.get(
          `/products/${getCookie('select_product')}/`,
        )
        const selectedProduct = response.data
        setProductDetails(selectedProduct)
        // setCookie('boolform', false);
        // window.location.href = '/company';
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    getProductDetails()
  }, [])

  useEffect(() => {
    const CNPJinfo = async () => {
      try {
        const console = await api.get(
          `/companies/${productDetails?.company}/`,
          {
            headers: {
              Authorization: `Token ${getCookie('token')}`,
            },
          },
        )
        const console1 = await api.get(`/users/${productDetails?.company}/`, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        })
        setCnpjCompany(console.data.cnpj)
        setCreatedBy(console.data.name)
        setCookie('boolform', false)
      } catch (error) {
        console.error('Error updating product:', error)
      }
    }
    CNPJinfo()
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setModifyPage('w-max justify-center ')
        setModifycarousel('w-96 h-80 rounded-3xl self-center  md: mt-24')
        setModifymsg('w-[600px] h-[375px]')
        selfmodifysizeinput('large')
      } else if (screens.isMediumScreen) {
        setModifyPage('flex-wrap w-fit justify-center md:ml-12')
        setModifycarousel('w-[720px] h-96 rounded-3xl self-center mt-8')
        setModifymsg('w-[700px] h-[375px]')
        selfmodifysizeinput('large')
      } else if (screens.isSmallScreen) {
        setModifyPage('flex-wrap w-fit justify-center  md:ml-4')
        setModifycarousel('w-[520px] h-96 rounded-3xl self-center mt-8')
        setModifymsg('w-[520px] h-[375px]')
        selfmodifysizeinput('medium')
      } else if (screens.isNanoScreen) {
        setModifyPage('flex-col ml-2  justify-start self-start ')
        setModifycarousel(' w-64 h-44 rounded-3xl self-center  md:mt-8')
        setModifymsg('w-[270px] h-[575px]')
        selfmodifysizeinput('small')
      } else if (screens.isSmallNanoScreen) {
        setModifyPage('flex-col ml-1  justify-start self-start ')
        setModifycarousel(' w-54 h-34 rounded-2xl self-center  md:mt-4')
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

  const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides =
      productDetails?.images?.map((image) => ({ url: image.image })) || []

    const handleNextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      )
    }

    const handlePrevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
      )
    }

    return (
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
        className="h-full w-full rounded-2xl bg-cover bg-center shadow-md shadow-black duration-500"
      >
        <button type="button" onClick={handlePrevSlide}>
          <B_carousel direction="left" />
        </button>
        <button type="button" onClick={handleNextSlide}>
          <B_carousel direction="right" />
        </button>
      </div>
    )
  }

  const handleApproveClick = async () => {
    try {
      const updatedProductData = {
        is_approved: true,
      }
      await api.patch(
        `/products/${getCookie('select_product')}/`,
        updatedProductData,
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      setCookie('boolform', false)
      alert('Produto aprovada com sucesso!')
      window.location.href = '/company'
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteClick = async () => {
    try {
      await api.delete(`/products/${getCookie('select_product')}/`, {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setCookie('boolform', false)
      alert('Produto Reprovado!')
      window.location.href = '/company'
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div>
      <form className={`flex flex-row-reverse ${modifypage}  h-full `}>
        <div className="flex flex-col justify-center rounded-2xl ">
          <div className="flex flex-row self-center md:gap-6 ">
            <div className=" w-fit cursor-pointer rounded-3xl  p-2 active:bg-[#7a7a7a]">
              <input
                className="cursor-pointer"
                type="button"
                value="Voltar"
                onClick={handleVerifyClick}
              />
            </div>
            <div className="w-fit cursor-pointer rounded-3xl bg-[#6cbe7a83] p-2 text-[#6CBE79] active:bg-[#518f5b]">
              <input
                className="cursor-pointer"
                type="button"
                value="Aprovar"
                onClick={handleApproveClick}
              />
            </div>
            <div className="w-fit cursor-pointer rounded-3xl bg-[#fa480771] p-2 text-[#FA4907] active:bg-[hsl(16,70%,33%)]">
              <input
                className="cursor-pointer"
                type="button"
                value="Apagar"
                onClick={handleDeleteClick}
              />
            </div>
          </div>
          <div
            className={`relative m-auto h-44 min-h-[222px] min-w-[222px] self-center px-4 py-4 md:h-[400px] md:w-[400px]`}
          >
            {' '}
            {/* Apagar o background */}
            {productDetails && <Carousel />}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 md:flex-wrap">
            <label className="font-bold">Nome</label>
            <input
              type="text"
              className=" min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2 text-[#6B6B6B]  md:w-80  "
              value={productDetails?.name || ''}
              disabled={true}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-col gap-2 ">
              <label className="font-bold">Empresa</label>
              <input
                type="text"
                className=" min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2 text-[#6B6B6B]  md:w-72  "
                value={` ${created_by}`}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input
                type="text"
                className=" min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2 text-[#6B6B6B]  md:w-72  "
                value={` ${cnpjCompany}`}
                disabled={true}
              />
            </div>
          </div>
          <textarea
            className={`msg mb-3 mt-3 rounded-md border bg-[#E8E8E8] px-3 font-light text-[#6B6B6B] shadow-md outline-4 focus:outline-[#FEBD2F]   ${modifymsg}  resize-none`}
            id="123"
            name="123"
            cols="50"
            rows="20"
            disabled={true}
            required
            value={`${productDetails?.description}`}
          ></textarea>
          {/* <InputField label="Description" name="form_product2" id="form_product2" style="input-msg-see" size="large" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at vulputate mi, vel elementum dolor. Sed vehicula risus odio, at aliquet nulla dapibus id. Ut dictum pellentesque laoreet. Phasellus porttitor, risus ac laoreet viverra, nisi lectus faucibus orci, eget consectetur eros lectus ut tellus. Aliquam erat volutpat. Curabitur pretium tellus diam, ut sodales tellus vehicula quis. Pellentesque euismod quis libero eu malesuada. Donec vitae dictum libero, et pharetra lorem. Etiam id tempus augue. Integer scelerisque enim sit amet neque sagittis, vel aliquet eros bibendum. Sed lobortis porta sagittis. Fusce ut lacus arcu. Donec velit est, vulputate et consectetur vel, dictum sodales diam. Nunc laoreet erat in nisl lobortis, sed bibendum neque facilisis. Proin facilisis pellentesque ipsum, et molestie tortor bibendum dignissim. Integer fermentum, neque in eleifend sollicitudin, libero enim dignissim lectus, ut tincidunt neque elit sed tortor." onChange={null} /> */}
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Quantidade</label>
              <input
                type="text"
                className=" md:w-42 min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2  text-[#6B6B6B]  "
                value={` ${productDetails?.quantity}`}
                disabled={true}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold">Preço</label>
              <input
                type="text"
                className=" w-42 min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2 text-[#6B6B6B]  "
                value={`R$ ${productDetails?.price.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Categoria</label>
              <input
                type="text"
                className=" w-42 min-w-[full] rounded-md bg-[#E8E8E8] px-2 py-2 text-[#6B6B6B]  "
                value={` ${productDetails?.category}`}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
