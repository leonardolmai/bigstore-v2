import React, { useState, useEffect } from 'react'
import { api, api2 } from '@/utils/api'
import { Cards } from '@/types/cards'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { getCookie } from 'cookies-next'

// Função para buscar os cartões da API
async function fetchCreditCards() {
  try {
    const response = await api2.get('/cards/', {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
    const fetchedCreditCards: Cards[] = response.data
    return fetchedCreditCards
  } catch (error) {
    throw new Error('Failed to fetch credit cards')
  }
}

export function User_Cards({ screens }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [alingForm, setAlingForm] = useState('')
  const [alignbutton, setalignbutton] = useState('')
  const [aligncard, setaligncard] = useState('')

  const [cards, setCards] = useState([])
  const {
    data: creditCards = [],
    isLoading,
    isError,
  } = useQuery<Cards[]>('creditCards', fetchCreditCards)
  const [selectcard, setselectcard] = useState(null)
  const [createdform, setcreatedform] = useState(false)
  const [createdform2, setcreatedform2] = useState(false)

  // post-patch
  const [updatedName, setUpdatedName] = useState('')
  const [updatedNumber, setUpdatedNumber] = useState('')
  const [updatedExpirationMonth, setUpdatedExpirationMonth] = useState('')
  const [updatedExpirationYear, setUpdatedExpirationYear] = useState('')
  const [updatedCvc, setUpdatedCvc] = useState('')

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api2.get('/cards/', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })
        const fetchedCreditCards: Cards[] = response.data
        setCards(fetchedCreditCards) // Atualizar o estado com os dados buscados
      } catch (error) {
        console.error('Erro ao obter a lista de cartões:', error)
      }
    }
    fetchCards()
  }, [])

  const handleCreateCard = async () => {
    try {
      const response = await api2.post(
        '/cards/',
        {
          name: updatedName,
          number: updatedNumber,
          expiration_month: updatedExpirationMonth,
          expiration_year: updatedExpirationYear,
          cvc: updatedCvc,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      )

      setcreatedform(false)
      window.location.href = '/account'
    } catch (error) {
      console.error('Erro ao criar o cartão:', error)
    }
  }

  const handlePatchCard = async () => {
    try {
      if (!selectcard) {
        console.error('Nenhum cartão selecionado.')
        return
      }

      // Montar os dados atualizados do cartão
      const updatedCardData = {
        name: updatedName || selectcard.name,
        number: updatedNumber || selectcard.number,
        expiration_month: updatedExpirationMonth || selectcard.expiration_month,
        expiration_year: updatedExpirationYear || selectcard.expiration_year,
        cvc: updatedCvc || selectcard.cvc,
      }

      // Fazer a requisição PATCH para atualizar o cartão
      const response = await api2.patch(
        `/cards/${selectcard.id}/`,
        updatedCardData,
        {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        },
      )
      window.location.href = '/account'
      // Verificar se a requisição foi bem-sucedida e exibir o alerta
      if (response.status === 200) {
        alert('Cartão atualizado com sucesso!')
      }

      // Restaurar os campos do formulário para vazio após a atualização
      setUpdatedName('')
      setUpdatedNumber('')
      setUpdatedExpirationMonth('')
      setUpdatedExpirationYear('')
      setUpdatedCvc('')
      setcreatedform2(false)

      // Atualizar o estado do cartão selecionado com os novos dados
      setselectcard({ ...selectcard, ...updatedCardData })
    } catch (error) {
      console.error('Erro ao atualizar o cartão:', error)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]')
        setalignbutton('flex-col')
        setaligncard('flex-row')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]')
        setalignbutton('flex-col')
        setaligncard('flex-row')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]')
        setalignbutton('flex-row')
        setaligncard('flex-col')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]')
        setalignbutton('w-[200px] h-[300px]')
        setalignbutton('flex-row')
        setaligncard('flex-col')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]')
        setalignbutton('w-60')
        setalignbutton('flex-row')
        setaligncard('flex-col')
      } else {
        setAlingForm('w-[183px]')
        setalignbutton('w-60')
        setalignbutton('flex-row')
        setaligncard('flex-col')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleFileChange = (event) => {
    const fileList = event.target.files
    setImages(fileList)
  }

  const fetchCardDetails = async (cardId: number) => {
    try {
      const response = await api2.get(`/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })

      const selectedCardDetails = response.data
      setselectcard(selectedCardDetails)
    } catch (error) {
      console.error('Erro ao obter detalhes do cartão:', error)
    }
  }

  const handleCardSelection = (cardId) => {
    fetchCardDetails(cardId)
  }

  const toform = () => {
    if (createdform === false) {
      setcreatedform(true)
    } else {
      setcreatedform(false)
    }
  }

  const toform2 = () => {
    if (createdform2 === false) {
      setcreatedform2(true)
    } else {
      setcreatedform2(false)
    }
  }

  const toformDelete = async (cardId: number) => {
    try {
      const response = await api2.delete(`/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      window.location.href = '/account'
    } catch (error) {
      console.error('Erro ao obter detalhes do cartão:', error)
    }
  }

  const handleSubmit = async (event) => {
    if (typeof window !== 'undefined') {
    }
  }

  return (
    <div className={`flex flex-col  items-center ${alingForm} h-full`}>
      <div className="flex flex-col  items-start ">
        <div
          className={` flex gap-6 ${
            screens.isSmallScreen === true ? 'flex-row' : 'flex-col'
          }  items-center justify-center`}
        >
          {createdform ? (
            <form onSubmit={handleCreateCard} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label>Titular</label>
                <input
                  type="text"
                  className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Número do Cartão</label>
                <input
                  type="number"
                  className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                  value={updatedNumber}
                  onChange={(e) => setUpdatedNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Data de Validade</label>
                <div className="flex flex-row gap-2">
                  <input
                    type="number"
                    pattern="[0-9]{2}"
                    placeholder="month"
                    className="min-w-[65px] max-w-[75px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                    value={updatedExpirationMonth}
                    onChange={(e) => setUpdatedExpirationMonth(e.target.value)}
                  />
                  <p>/</p>
                  <input
                    type="number"
                    pattern="[0-9]{4}"
                    placeholder="year"
                    className="min-w-[65px] max-w-[75px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                    value={updatedExpirationYear}
                    onChange={(e) => setUpdatedExpirationYear(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>CVC</label>
                <input
                  type="password"
                  pattern="[0-9]{3}"
                  autoComplete={'false'}
                  className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                  value={updatedCvc}
                  onChange={(e) => setUpdatedCvc(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={toform}
                  className="no-select mt-2 w-full cursor-pointer rounded-xl bg-[#000000] p-1 text-white shadow-md active:bg-white active:text-black"
                >
                  Voltar
                </button>
                <button
                  onClick={handleCreateCard}
                  type="submit"
                  className="no-select mt-2 w-full cursor-pointer rounded-xl bg-[#FEBF2F] p-1 shadow-md active:bg-orange-500"
                >
                  Criar Cartão
                </button>
              </div>
            </form>
          ) : (
            <>
              {createdform2 ? (
                <form
                  onSubmit={handlePatchCard}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col">
                    <label>Titular</label>
                    <input
                      type="text"
                      className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                      value={
                        updatedName || (selectcard && selectcard.name) || ''
                      }
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Numero do catão</label>
                    <input
                      type="number"
                      className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                      value={
                        updatedNumber || (selectcard && selectcard.number) || ''
                      }
                      onChange={(e) => setUpdatedNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Data de Validade</label>
                    <div className="flex flex-row gap-2">
                      <input
                        type="number"
                        onInput="this.value = this.value.slice(0, 2)"
                        placeholder="month"
                        className="min-w-[65px] max-w-[75px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                        value={
                          updatedExpirationMonth ||
                          (selectcard && selectcard.expiration_month) ||
                          ''
                        }
                        onChange={(e) =>
                          setUpdatedExpirationMonth(e.target.value)
                        }
                      />
                      <p>/</p>
                      <input
                        type="number"
                        pattern="[0-9]{4}"
                        placeholder="year"
                        className="min-w-[65px] max-w-[75px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                        value={
                          updatedExpirationYear ||
                          (selectcard && selectcard.expiration_year) ||
                          ''
                        }
                        onChange={(e) =>
                          setUpdatedExpirationYear(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label>CVC</label>
                    <input
                      type="password"
                      pattern="[0-9]{3}"
                      autoComplete={false}
                      className="min-w-full max-w-[550px] rounded-lg pl-1 shadow-md outline-2 focus:outline-[#FEDB2F]"
                      value={updatedCvc || (selectcard && selectcard.cvc) || ''}
                      onChange={(e) => setUpdatedCvc(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      onClick={toform2}
                      className="no-select mt-2 w-full cursor-pointer rounded-xl bg-[#000000] p-1 text-white shadow-md active:bg-white active:text-black"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handlePatchCard}
                      className="no-select mt-2 w-full cursor-pointer rounded-xl bg-[#FEBF2F] p-1 shadow-md active:bg-orange-500"
                    >
                      Atualizar Cartão
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex w-48 flex-col">
                    <article className="flex flex-col items-center gap-6 ">
                      {selectcard !== null ? (
                        <div className={`flex   ${aligncard} gap-2`}>
                          <div className="ml-10 h-[130px] w-[250px] items-start rounded-xl  bg-gradient-to-r from-purple-600  to-blue-600 p-2 text-white shadow shadow-black">
                            <p className="no-select mb-1 mt-1">
                              Titular: {selectcard.name}
                            </p>
                            <p className="no-select mb-1 mt-1">
                              Número: {selectcard.number}
                            </p>
                            <p className="no-select mb-1 mt-1">
                              Validade: {selectcard.expiration_month}/
                              {selectcard.expiration_year}
                            </p>
                            <p className="no-select mb-1 mt-1">
                              CVC: {selectcard.cvc}
                            </p>
                          </div>
                          <div
                            className={`flex ${alignbutton}  ml-2   items-center justify-center gap-3`}
                          >
                            <button
                              onClick={toform2}
                              className="w-16 rounded-lg bg-green-400 p-1 shadow hover:bg-green-800 active:bg-green-200"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => toformDelete(selectcard.id)}
                              className="w-16 rounded-lg  bg-red-500 p-1 shadow hover:bg-red-800 active:bg-red-200"
                            >
                              Deletar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-32"></div>
                      )}

                      <div>
                        <select
                          id="category"
                          name="category"
                          className="no-select m-2 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
                          value={selectcard ? selectcard.id : ''} // Usar o valor de selectcard para selecionar a opção correta
                          onChange={(e) => handleCardSelection(e.target.value)}
                        >
                          <option value="" disabled>
                            Lista de Cartões
                          </option>
                          {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                              {card.name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={toform}
                          className="no-select mt-2 w-full cursor-pointer rounded-xl bg-[#FEBF2F] p-1 shadow active:bg-orange-500"
                        >
                          Criar novo Cartão
                        </button>
                      </div>
                    </article>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UserCardsWrapper({ screens }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <User_Cards screens={screens} />
    </QueryClientProvider>
  )
}
