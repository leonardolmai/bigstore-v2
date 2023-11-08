'use client'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { api } from '@/utils/api'
import { Cards } from '@/types/cards'
import { getCookie } from 'cookies-next'
const queryClient = new QueryClient()

export function Payment({ onPaymentOptionChange }) {
  const [showCreditCardOptions, setShowCreditCardOptions] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] = useState('')
  const [selectedCardInfo, setSelectedCardInfo] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')

  const {
    data: creditCards = [],
    isLoading,
    isError,
  } = useQuery<Cards[]>('creditCards', fetchCreditCards)

  useEffect(() => {
    const selectedCard = creditCards.find(
      (card) => card.name === selectedCreditCard,
    )
    setSelectedCardInfo(selectedCard)
    onPaymentOptionChange(
      selectedPaymentOption,
      selectedCard && selectedCard.id,
    )
  }, [
    selectedCreditCard,
    selectedPaymentOption,
    creditCards,
    onPaymentOptionChange,
  ])

  const handlePaymentOptionChange = (event) => {
    const selectedOption = event.target.value
    setSelectedPaymentOption(selectedOption)

    if (selectedOption === 'card') {
      setShowCreditCardOptions(true)
      setSelectedCreditCard('')
    } else {
      setShowCreditCardOptions(false)
      setSelectedCreditCard('')
    }
  }

  const handleCreditCardOptionChange = (event) => {
    setSelectedCreditCard(event.target.value)
  }

  const handleNewCreditCardClick = () => {
    window.location.href = '/account/cards'
  }

  async function fetchCreditCards() {
    const token = getCookie('token')
    try {
      const response = await api.get('/cards/', {
        headers: { Authorization: `Token ${token}` },
      })
      const fetchedCreditCards: Cards[] = response.data
      return fetchedCreditCards
    } catch (error) {
      throw new Error('Failed to fetch credit cards')
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col flex-wrap gap-5">
        <select
          className="w-min-full mb-6 rounded-xl  bg-[#FEBD2F] p-3 text-start"
          name="payment-option"
          id="payment-option"
          onChange={handlePaymentOptionChange}
        >
          <option value="">Selecione o Pagamento</option>
          <option value="bank_slip">Boleto</option>
          <option value="pix">Pix</option>
          <option value="card">Card</option>
        </select>

        {showCreditCardOptions && (
          <>
            {creditCards.length > 0 ? (
              <select
                className="w-min-full mb-6 rounded-xl bg-[#FEBD2F] p-3 text-start"
                name="card-option"
                id="card-option"
                value={selectedCreditCard}
                onChange={handleCreditCardOptionChange}
              >
                <option value="">Selecione seu Cartão</option>
                {creditCards.map((card) => (
                  <option key={card.id} value={card.name}>
                    {card.name}
                  </option>
                ))}
              </select>
            ) : (
              <button
                className="w-min-full mb-6 rounded-xl  bg-[#FEBD2F] p-3 text-start"
                onClick={handleNewCreditCardClick}
              >
                Cadastrar novo cartão
              </button>
            )}
          </>
        )}

        {selectedCardInfo && (
          <div className="flex w-56 flex-col justify-start ">
            <details
              className="rounded-lg  bg-zinc-200 p-6 text-stone-950 open:shadow-lg open:ring-1 open:ring-black hover:open:bg-white dark:open:ring-white/10"
              open
            >
              <summary className=" cursor-pointer select-none text-sm font-semibold leading-6 text-slate-900 dark:text-black">
                {selectedCardInfo.name}
              </summary>
              <div className="mt-3 text-sm leading-6 text-stone-950 dark:text-stone-950">
                <p>Titular: {selectedCardInfo.name}</p>
                <p>Número: {selectedCardInfo.number}</p>
                <p>
                  Data expiração: {selectedCardInfo.expiration_month}/
                  {selectedCardInfo.expiration_year}
                </p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PaymentWithQueryClientProvider({
  onPaymentOptionChange,
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Payment onPaymentOptionChange={onPaymentOptionChange} />
    </QueryClientProvider>
  )
}
