import React, { useState, useEffect } from 'react'
import { BadgeDollarSign as Badge } from 'lucide-react'
import Product_forms from './Product_forms'
import { api, api2 } from '@/utils/api'
import { getCookie } from 'cookies-next'
import { Order, OrderItem } from '@/types/orders'

const formatDate = (datetime: string) => {
  const date = new Date(datetime)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export default function Product({ screens }) {
  const [boolforms, setBoolForms] = useState(false)
  const [widthlist, setwidthlist] = useState('')
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api2.get('/orders', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })
        setOrders(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist('w-56')
      } else if (screens.isMediumScreen) {
        setwidthlist('w-44 self-center items-center')
      } else if (screens.isSmallScreen) {
        setwidthlist(
          'w-28  flex flex-col text-xs break-all self-center items-center',
        )
      } else if (screens.isNanoScreen) {
        setwidthlist(
          ' w-[70px] flex flex-col text-xs break-all justif  self-center items-center ',
        )
      } else if (screens.isSmallNanoScreen) {
        setwidthlist(
          ' w-[44px] flex flex-col  text-xs break-all justif  self-center items-center ',
        )
      } else {
        setwidthlist(
          ' w-[33px] flex flex-col  text-xs break-all justif  self-center items-center ',
        )
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleformClick = () => {
    if (typeof window !== 'undefined') {
      setBoolForms(true)
    }
  }

  return (
    <div className={` select-none `}>
      {boolforms ? (
        <>
          <Product_forms
            screens={screens}
            boolforms={boolforms}
            setBoolForms={setBoolForms}
          />
        </>
      ) : (
        <div className="mx-2">
          <table className=" w-full border-collapse overflow-hidden rounded-lg ">
            <thead>
              <tr className="bg-[#ffffff] shadow-xl">
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Id pedido
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Id produto
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Nome
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Quantidade
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Id empresa
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Envio
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Data
                </th>
                <th className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                  Ação
                </th>
              </tr>
            </thead>
            <br />
            <tbody>
              {/* Replace the existing map function with the orders map */}
              {orders.map(async (order) => {
                const orderItemResponse = await api2.get(
                  `/orders/${order.id}/order_items/`,
                  {
                    headers: {
                      // eslint-disable-next-line camelcase
                      Authorization: `Bearer ${getCookie('token')}`,
                    },
                  },
                )
                const orderItems = orderItemResponse.data

                if (orderItems.length > 0) {
                  return (
                    <React.Fragment key={order.id}>
                      {order.order_items.map((orderItem) => (
                        <tr
                          key={orderItem.id}
                          className={`${
                            order.id % 2 === 0
                              ? 'bg-[#F5F6F7]'
                              : 'b-1 bg-[#b8b8b8] shadow-xl'
                          } `}
                        >
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {order.id}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {orderItem.id}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {orderItem.name.length > 15
                              ? `${orderItem.name.substring(0, 15)}...`
                              : orderItem.name}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {orderItem.quantity}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {order.company}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {order.status === 'pending' && (
                              <p className="font-bold text-rose-600">
                                {order.status}
                              </p>
                            )}
                            {order.status === 'processing' && (
                              <p className="font-bold text-yellow-500">
                                {order.status}
                              </p>
                            )}
                            {order.status === 'shiped' && (
                              <p className="font-bold text-blue-500">
                                {order.status}
                              </p>
                            )}
                            {order.status === 'delivered' && (
                              <p className="font-bold text-green-500">
                                {order.status}
                              </p>
                            )}
                            {order.status === 'returned' && (
                              <p className="font-bold text-red-500">
                                {order.status}
                              </p>
                            )}
                            {order.status === 'canceled' && (
                              <p className="font-bold text-gray-500">
                                {order.status}
                              </p>
                            )}
                          </td>
                          <td className="break-all border-e-2 p-2 text-center md:w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px]">
                            {formatDate(order.created_at)}
                          </td>
                          <td
                            className="cursor-pointer items-center break-all border-e-2 p-2 pl-4 text-center md:w-[100px] md:pl-8 lg:w-[130px] lg:pl-12 xl:w-[150px] xl:pl-14 2xl:w-[165px] 2xl:pl-16 "
                            onClick={() => handleformClick(orderItem)}
                          >
                            <Badge
                              size={24}
                              className="h-8 w-max cursor-pointer self-center rounded-3xl bg-[#FEBD2F] shadow-md shadow-black hover:stroke-amber-950 hover:shadow-amber-400 active:bg-[#9e7620] active:bg-[#f7aa02]"
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                }
                return <></>
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* {Array.from({ length: items }).map((_, index) => (
          <div key={order.id}>

            <div className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? ("bg-[#F5F6F7]") : "bg-[#b8b8b8]"} justify-between items-start rounded-md  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`}>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>{index}</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>Name...</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>X</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p>xxxxxxxxxxxxxx</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center  border-e-2 `}><p className="font-bold">Send</p></div>
              <div className={`flex self-center justify-self-center 2xl:w-96 justify-center    cursor-pointer `}>

                <div className='flex flex-col justify-center items-center '>
                  <Badge onClick={handleformClick} size={24} className='w-max   h-8  bg-[#FEBD2F] hover:stroke-amber-950 cursor-pointer rounded-3xl shadow-md shadow-black hover:shadow-amber-400 active:bg-[#f7aa02] active:bg-[#9e7620]' />
                </div>

              </div>
            </div>
          </div>
        ))}

      </>} */}
    </div>
  )
}
