'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Product_forms({
  screens,
  boolforms,
  setBoolForms,
  order,
}) {
  const [title, setTitle] = useState('')
  const [information, setInformation] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alingForm, setAlingForm] = useState('')
  const [formInput, setFormInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`http://localhost:8000/api/report/`, {
        title,
        information,
        orderId: order.id, // Pass the order id as a parameter for the POST request
      })

      setAlertMessage('Employee added successfully.')
    } catch (error) {
      setAlertMessage('Request failed. Please try again.')
    }

    setLoading(false)
  }

  const handleBackClick = () => {
    setBoolForms(false)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]')
        setFormInput('w-[700px] h-[300px]')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]')
        setFormInput('w-[600px] h-[300px]')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]')
        setFormInput('w-[500px] h-[300px]')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]')
        setFormInput('w-[200px] h-[300px]')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]')
        setFormInput('w-60')
      } else {
        setAlingForm('w-[183px]')
        setFormInput('w-60')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleInputChange = (e) => {
    setTitle(e.target.value)
    setInformation(e.target.value)
  }

  return (
    <div className={`${alingForm} flex flex-col justify-center self-center`}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6"
      >
        <input
          className="w-full max-w-[400px] rounded-lg bg-white shadow focus:outline-[#FEBD2F]"
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Título"
          required
        />
        <textarea
          rows={20}
          className="w-full max-w-[550px] resize-none rounded-lg shadow focus:outline-[#FEBD2F]"
          cols={50}
          value={information}
          onChange={handleInputChange}
          placeholder="Detalhes..."
        ></textarea>

        <div className="flex flex-row flex-wrap gap-10">
          <button
            className="rounded-xl bg-[#FEBD2F] p-1 shadow-md shadow-black active:bg-black active:text-[#FEBD2F]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Pedindo reembolso...' : 'Pedir Reembolso'}
          </button>
          <button
            className="rounded-xl bg-slate-200 p-1 shadow-md shadow-black active:bg-black active:text-white"
            onClick={handleBackClick}
          >
            Voltar
          </button>
        </div>
      </form>

      {alertMessage && <div className="alert">{alertMessage}</div>}
    </div>
  )
}
