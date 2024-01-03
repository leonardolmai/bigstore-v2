import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'X-Company-CNPJ': process.env.NEXT_PUBLIC_COMPANY_CNPJ,
  },
})

export const api2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL_2,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'X-Company-CNPJ': process.env.NEXT_PUBLIC_COMPANY_CNPJ,
    // 'X-Company-CNPJ': '000',
  },
})

export const api3 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL_3,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    // 'X-Company-CNPJ': process.env.NEXT_PUBLIC_COMPANY_CNPJ,
    'X-Company-CNPJ': '000',
  },
})
