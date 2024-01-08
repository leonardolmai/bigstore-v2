'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Counter } from '@/components/molecules/CountValue'
import { Trash2 as Trash } from 'lucide-react'
import InputField from '@/components/atoms/inputs'
import PaymentWithQueryClientProvider from '@/components/molecules/payment'
import { hasCookie, getCookie } from 'cookies-next'
import { api, api2, api3 } from '@/utils/api'
import Freight_router from '@/components/molecules/freight_router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMediaQuery } from 'react-responsive'

export function getLocalStorage() {
  const localStorageItems = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!isNaN(Number(key))) {
      const value = localStorage.getItem(key)
      localStorageItems.push({ key, value: JSON.parse(value) })
    }
  }

  return localStorageItems
}

export function LocalStorageData() {
  const [localStorageItems, setLocalStorageItems] = useState<any[]>([])
  const [QuantitySelect, setQuantitySelect] = useState(1)
  const [cupom, setCupom] = useState('')
  const [cupomactivate, setCupomActivate] = useState(false)
  const [toastactive, settoastactive] = useState(false)
  const valued = '10%'

  // selectItems
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedItemsCount, setSelectedItemsCount] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [finalValue, setFinalValue] = useState(0)

  // responsive
  const [ListItems, setListItems] = useState('')
  const [infotrash, setInfoTrash] = useState('')
  const isLargeScreen = useMediaQuery(
    { minWidth: 1100 },
    undefined,
    (matches) => matches,
  )
  const isMediumScreen = useMediaQuery(
    { minWidth: 1000 },
    undefined,
    (matches) => matches,
  )
  const isSmallScreen = useMediaQuery(
    { minWidth: 900 },
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
      if (isLargeScreen) {
        setListItems('flex flex-row w-32')
        setInfoTrash('w-[300px] flex-end')
      } else if (isMediumScreen) {
        setListItems('flex flex-row w-32')
        setInfoTrash('w-[30px]')
      } else if (isSmallScreen) {
        setListItems('flex flex-row w-32')
      } else if (isNanoScreen) {
        setListItems('flex flex-col w-32')
      } else if (isSmallNanoScreen) {
        setListItems('flex flex-col w-32')
      }
    }
  }, [
    ListItems,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isNanoScreen,
    isSmallNanoScreen,
  ])

  // const accessToken = window && getCookie('token')
  const [accessToken, setAccessToken] = useState(getCookie('token'))
  // payments
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')
  const [selectedCardId, setSelectedCardId] = useState('')

  // payments purchase
  const handlePaymentOptionChange = (option, cardId) => {
    setSelectedPaymentOption(option)
    setSelectedCardId(cardId)
  }

  // Address
  const [selectedAddressCep, setSelectedAddressCep] = useState('')
  const [selectedAddressId, setSelectedAddressId] = useState('')

  // Address purchase
  const handleAddresssesOptionChange = (postal_code, addressId) => {
    setSelectedAddressCep(postal_code)
    setSelectedAddressId(addressId)
  }

  // value freight
  const handleFinalFreightValue = (value: number | null) => {
    if (value !== null) {
      const endValue = value + totalValue
      setFinalValue(endValue)
    }
  }

  const handlePostOrder = () => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }

    const selectedProducts = {}

    localStorageItems.forEach((item) => {
      if (selectedItems.includes(item.key)) {
        selectedProducts[item.key] = item.value.QuantitySelect
        localStorage.removeItem(item.key)
      }
    })
    const orderData =
      selectedPaymentOption === 'card'
        ? {
            payment_method: selectedPaymentOption,
            card_id: selectedPaymentOption === 'card' ? selectedCardId : null,
            address_id: selectedAddressId,
            products: selectedProducts,
          }
        : {
            payment_method: selectedPaymentOption,
            address_id: selectedAddressId,
            products: selectedProducts,
          }

    api3
      .post('/orders/', orderData, { headers })
      .then((response) => {
        // Processar a resposta do servidor, se necessário
        settoastactive(true)

        toast.success('Compra efetuada com sucesso', {
          onClose: () => {
            window.location.href = '/cart'
          },
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const items = getLocalStorage()
    setLocalStorageItems(items)
  }, [])

  useEffect(() => {
    let count = 0
    let total = 0

    localStorageItems.forEach((item) => {
      const value = item.value
      const product = value.product || {}

      if (selectedItems.includes(item.key)) {
        count += value.QuantitySelect
        total += value.QuantitySelect * product.price
      }
    })

    setSelectedItemsCount(count)

    if (cupomactivate) {
      total = total - total * 0.1
    }

    setTotalValue(total)
  }, [localStorageItems, selectedItems, cupomactivate])

  const handleCheckboxChange = (itemKey: string) => {
    const item = localStorageItems.find((item) => item.key === itemKey)
    if (!item) return

    const updatedItems = selectedItems.includes(itemKey)
      ? selectedItems.filter((key) => key !== itemKey)
      : [...selectedItems, itemKey]

    setSelectedItems(updatedItems)
  }

  const handleDeleteItem = (itemKey: string) => {
    localStorage.removeItem(itemKey)
    const updatedItems = localStorageItems.filter(
      (item) => item.key !== itemKey,
    )
    setLocalStorageItems(updatedItems)
  }

  const handleCountChange = (count: number, itemKey: string) => {
    setQuantitySelect(count)

    const updatedItems = localStorageItems.map((item) => {
      if (item.key === itemKey) {
        const updatedValue = { ...item.value, QuantitySelect: count }
        return { ...item, value: updatedValue }
      }
      return item
    })

    setLocalStorageItems(updatedItems)
    localStorage.setItem(
      itemKey,
      JSON.stringify(updatedItems.find((item) => item.key === itemKey).value),
    )
  }

  const [addresses, setAddresses] = useState<Address[]>([])

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api3.get('/addresses/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setAddresses(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAddresses()
  }, [])

  return (
    <div>
      <div className="flex flex-col-reverse items-center justify-center md:flex-row md:items-start">
        <div className=" item-center h-full w-full  md:ml-5 md:w-11/12">
          <article className="flex flex-row justify-center md:mt-12 md:justify-start">
            <div className="w-42 mb-3 rounded-xl bg-[#D9D9D9] p-3 text-start">
              <h1>Meu Carrinho</h1>
            </div>
          </article>
          <article className="mt-2 flex flex-col justify-start">
            {/* {localStorageItems.map(async (item, index) => { */}
            {localStorageItems.map((item, index) => {
              // const imageResponse = await api.get(
              //   `/2/products/${item.value.product.id}/images`,
              // )

              // const images = imageResponse.data

              const value = item.value
              const product = value.product || {}
              const images = value.images
              // const firstImage = '/static/smartphone.jpg'

              const firstImage =
                images && images.length > 0 ? images[0].image : null

              // const firstImage =
              //   product.images && product.images.length > 0
              //     ? product.images[0].image
              //     : null
              const isChecked = JSON.parse(
                localStorage.getItem('orders') || '[]',
              ).includes(item.key)

              return (
                <div
                  className={`${ListItems} mb-6 h-full min-h-full w-full min-w-[300px] place-items-center rounded-xl bg-[#D9D9D9] p-3`}
                  key={index}
                >
                  {firstImage && (
                    <>
                      <div className="items-center">
                        <Link href={`products / ${item.key} `} className="item">
                          <Image
                            src={'http://127.0.0.1:8002/' + firstImage}
                            width={'50'}
                            height={'50'}
                            className="max-w-[50px] rounded-xl"
                          />
                        </Link>
                      </div>

                      <div className="ml-6 flex flex-col">
                        <h1>
                          <strong>ID:</strong>
                          {item.key}
                        </h1>
                        <h1 className={`min - w - full`}>
                          <strong>Nome:</strong>
                          {product.name}
                        </h1>
                        <h1>
                          <strong>Preço: R$</strong>
                          {value.product.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </h1>

                        <Counter
                          maxLimit={product.quantity}
                          initialQuantity={value.QuantitySelect}
                          onCountChange={(count) =>
                            handleCountChange(count, item.key)
                          }
                        />
                        <div className="flex flex-row items-center gap-6">
                          <br />
                          <input
                            className="h-4 w-4 rounded-xl active:bg-[#FEBD2F]"
                            type="checkbox"
                            defaultChecked={isChecked}
                            onChange={() => handleCheckboxChange(item.key)}
                          />
                          <h6>Selecione para compra</h6>
                        </div>
                      </div>
                      <div>
                        <div
                          className={`- row w - full flex ${infotrash} justify - end`}
                        >
                          <Trash
                            color={'red'}
                            size={24}
                            className="cursor-pointer place-self-center active:stroke-red-950"
                            onClick={() => handleDeleteItem(item.key)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </article>
        </div>

        <div className="jsutify-center md:item-center mb-60 mt-2 h-auto w-auto max-w-[400px]  rounded-xl bg-[#F1F1F4] p-6 md:ml-4 md:mr-5 md:mt-10 md:p-3">
          <article className="ml-4 mr-4 mt-4 flex flex-row justify-center">
            <div className="mb-auto w-max rounded-xl bg-[#D9D9D9] p-3 text-center">
              <h1>Complete a Compra</h1>
            </div>
          </article>
          <div>
            <InputField
              label="Cupom:"
              name="input"
              id="input-field"
              style="input-text-sales"
              size="medium"
              value={cupom}
              onChange={(event) => setCupom(event.target.value)}
            />

            {cupom === valued ? (
              <p className="font-bold text-green-500">
                Cupom 10% desconto:{' '}
                <span
                  className="rounder-xl pointer cursor-pointer rounded-xl bg-green-500 p-1 text-black hover:bg-green-700 active:bg-green-200"
                  onClick={() => setCupomActivate(true)}
                >
                  Ativar
                </span>
              </p>
            ) : cupom === '' ? null : (
              <p
                className="text-red-500"
                onClick={() => setCupomActivate(false)}
              >
                Não tem Cupom
              </p>
            )}
            <div className="mb-6 font-bold">
              <p className="mb-6">
                Valor do(s) produto(s) :{' '}
                {totalValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <Freight_router
                quantity={selectedItemsCount}
                cep={selectedAddressCep}
                onFinalFreightValue={handleFinalFreightValue}
              />
              <p className="mb-6">
                Quantidade de produtos selecionados: {selectedItemsCount}
              </p>
              {finalValue !== 0 ? (
                <p className="mb-6 font-extrabold">
                  valor Final:{' '}
                  {finalValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              ) : null}
            </div>
            <div className="w-68 mb-6 mt-6  flex flex-col rounded-xl text-start font-bold">
              {hasCookie('token') !== null ? (
                <div>
                  <select
                    className="w-min-full mb-6 rounded-xl  bg-[#FEBD2F] p-3 text-start"
                    name="address"
                    id="address"
                    value={selectedAddressId}
                    onChange={(event) => {
                      const selectedValue = event.target.value
                      setSelectedAddressId(selectedValue)

                      if (selectedValue === 'new') {
                        window.location.href = '/account'
                      } else {
                        const selectedAddress = addresses.find(
                          (address) => address.id === parseInt(selectedValue),
                        )
                        handleAddresssesOptionChange(
                          selectedAddress?.postal_code,
                          selectedAddress?.id,
                        )
                      }
                    }}
                  >
                    <option value="">Selecione o endereço</option>
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.postal_code}, {address.street},{' '}
                        {address.number}
                      </option>
                    ))}
                    <option value="new" className="cursor-pointer ">
                      Cadastrar novo endereço
                    </option>
                  </select>
                  <PaymentWithQueryClientProvider
                    onPaymentOptionChange={handlePaymentOptionChange}
                  />
                </div>
              ) : (
                <>
                  <Link
                    href={'account/login'}
                    className="active::bg-[#FF9730] w-min-full mb-6 mt-6 rounded-xl bg-[#FEBD2F] p-3 text-start"
                  >
                    Adicionar Endereço
                  </Link>
                  <Link
                    href={'account/login'}
                    className="active::bg-[#FF9730] w-min-full mb-6 mt-6 rounded-xl bg-[#FEBD2F] p-3 text-start"
                  >
                    Metodo de pagamento
                  </Link>
                </>
              )}
            </div>
            {!selectedAddressCep ||
            !selectedPaymentOption ||
            (selectedPaymentOption === 'card' && !selectedCardId) ||
            selectedItemsCount === 0 ? (
              <button className="active::bg-[#FF9730] w-min-full mb-6 cursor-default rounded-xl bg-[#FEBD2F] p-3 text-start">
                Finalizar
              </button>
            ) : toastactive !== true ? (
              <>
                {' '}
                <button
                  className="active::bg-[#FF9730] w-min-full mb-6 rounded-xl bg-[#FEBD2F] p-3 text-start"
                  onClick={handlePostOrder}
                >
                  Finalizar
                </button>
              </>
            ) : (
              <>
                <button className="active::bg-[#FF9730] w-min-full mb-6 cursor-default rounded-xl bg-[#FEBD2F] p-3 text-start">
                  Finalizando...
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
