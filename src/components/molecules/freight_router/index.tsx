import { useState, useEffect } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import v_location from '@/assets/icons/v_location.svg'
import Image from 'next/image'

export interface FreightLocale {
  localidade: string
  uf: string
  bairro: string
}

export interface FreightPrice {
  valor: number
  prazo: string
  peso: number
}

export interface FreightRouterProps {
  quantity: number
  cep: string
  onFinalFreightValue: (value: number | null) => void
}

export default function Freight_router({
  quantity,
  cep,
  onFinalFreightValue,
}: FreightRouterProps) {
  const [freightLocale, setFreightLocale] = useState<FreightLocale | null>(null)
  const [freightPrice, setFreightPrice] = useState<FreightPrice | null>(null)
  const [loading, setLoading] = useState(false)
  const [finalFreightValue, setFinalFreightValue] = useState<number | null>(
    null,
  )

  const handleCalculateFreight = async () => {
    if (cep) {
      setLoading(true)

      try {
        const response1 = await axios.get<FreightLocale>(
          `https://viacep.com.br/ws/${cep}/json/`,
        )
        setFreightLocale(response1.data)

        const mock = new MockAdapter(axios)
        const mockResponse = { valor: 15.5, prazo: '13 dias úteis', peso: 500 }
        mock
          .onGet(`/frete?cepOrigem=01153000&cepDestino=${cep}&peso=500`)
          .reply(200, mockResponse)

        const response2 = await axios.get<FreightPrice>(
          `/frete?cepOrigem=01153000&cepDestino=${cep}&peso=500`,
        )
        setFreightPrice(response2.data)
      } catch (error) {
        console.error('Erro ao calcular frete:', error)
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    if (quantity > 0) {
      handleCalculateFreight()
      if (freightPrice && freightPrice.valor && freightPrice.peso) {
        if (quantity > 1) {
          const newFinalFreightValue =
            Math.ceil((freightPrice.peso * quantity) / 1000 + 1) *
            freightPrice.valor
          setFinalFreightValue(newFinalFreightValue)
          onFinalFreightValue(newFinalFreightValue)
        } else {
          const newFinalFreightValue =
            Math.ceil((freightPrice.peso * quantity) / 1000) *
            freightPrice.valor
          setFinalFreightValue(newFinalFreightValue)
          onFinalFreightValue(newFinalFreightValue)
        }
      }
    }
  }, [quantity, freightPrice, onFinalFreightValue])

  // Restante do código do componente

  return (
    <div>
      {loading && <p>Calculando frete...</p>}
      <div className="flex flex-row">
        <p className="mb-3 mt-3 flex flex-row font-bold">
          Valor do frete: R${' '}
          {finalFreightValue && (
            <p className="font-light">
              {finalFreightValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </p>
      </div>
      <div className="flex flex-row">
        <p className="mb-3 mt-3 font-bold">Enviar para:ㅤ</p>
        {freightLocale && (
          <p className="flex flex-row items-center">
            <Image src={v_location} alt="Locale" priority={true} />ㅤ{' '}
            {freightLocale.localidade}, {freightLocale.uf}.
          </p>
        )}
      </div>
    </div>
  )
}
