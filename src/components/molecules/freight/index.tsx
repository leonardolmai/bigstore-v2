'use client'

import InputField from '@/components/atoms/inputs'
import { useState } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import v_location from '@/assets/icons/v_location.svg'
import Image from 'next/image'
import { B_forms } from '@/components/atoms/buttons'

interface FreightLocale {
  localidade: string
  uf: string
  bairro: string
}

interface FreightPrice {
  valor: string
  prazo: string
}

export default function Freight({ multiply }) {
  const [cep, setCep] = useState('')
  const [freightLocale, setFreightLocale] = useState<FreightLocale | null>(null)
  const [freightPrice, setFreightPrice] = useState<FreightPrice | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCepChange = (event) => {
    setCep(event.target.value)
  }

  const handleCalculateFreight = async () => {
    if (cep) {
      setLoading(true)

      try {
        const response1 = await axios.get<FreightLocale>(
          `https://viacep.com.br/ws/${cep}/json/`,
        )
        setFreightLocale(response1.data)
        const mock = new MockAdapter(axios)
        const mockResponse = { valor: 15.5, prazo: '16 dias úteis' }
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

  return (
    <div>
      <InputField
        label="CEP:"
        name="input"
        id="input-field"
        style="input-text-sales"
        size="medium"
        value={cep}
        onChange={handleCepChange}
      />
      <B_forms
        onclick={handleCalculateFreight}
        size="small"
        name="Calculate"
        type="freight"
      />

      {loading && <p>Calculando frete...</p>}
      <div className="flex flex-row">
        <p className="mb-3 mt-3 font-bold">
          Valor do frete: R${' '}
          {multiply == 1 && multiply && freightPrice && (
            <span className="font-light">
              {freightPrice.valor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
          {multiply % 2 === 0 && freightPrice && (
            <span className="font-light">
              {(freightPrice.valor * multiply).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
          {multiply % 2 !== 0 && multiply > 1 && freightPrice && (
            <span className="font-light">
              {(freightPrice.valor * (multiply - 1)).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <p className="mb-3 mt-3 font-bold">Enviar para:ㅤ</p>
        {freightLocale && (
          <p className="flex flex-row items-center">
            {' '}
            <Image src={v_location} alt="Locale" priority={true} />ㅤ{' '}
            {freightLocale?.localidade}, {freightLocale?.uf}.
          </p>
        )}
      </div>
    </div>
  )
}
