import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import Forms_Product from './Forms_Product'
import { api } from '@/utils/api'
import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next'
import { Product, ProductProps } from '@/types/product'

export default function Menu_Products({ screens, items, alingLists }) {
  const [boolforms, setBoolForms] = useState(getCookie('boolform'))
  const [widthlist, setwidthlist] = useState('')
  const [products, setProducts] = useState([])
  const [anproduct, setanProduct] = useState<Product | null>(null)
  const [searchType, setSearchType] = useState('name')
  const [searchValue, setSearchValue] = useState('')
  const [isFilterEmpty, setIsFilterEmpty] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      deleteCookie('boolform_1')
      if (hasCookie('boolform') == false) {
        setCookie('boolform', false)
      }
      if (screens.isLargeScreen) {
        setwidthlist('')
      } else if (screens.isMediumScreen) {
        setwidthlist('')
      } else if (screens.isSmallScreen) {
        setwidthlist('')
      } else if (screens.isNanoScreen) {
        setwidthlist('p-[55px]')
      } else if (screens.isSmallNanoScreen) {
        setwidthlist('p-8')
      } else {
        setwidthlist('p-20')
      }
    }

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleVerifyClick = (product: Product) => {
    setCookie('boolform', true)
    setCookie('select_product', product.id)
    window.location.href = '/company'
  }

  const handleApproveClick = async (product: Product) => {
    try {
      const updatedProductData = {
        is_approved: true,
      }
      await api.patch(`/products/${product.id}/`, updatedProductData, {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setCookie('boolform', false)
      alert('Produto aprovado com sucesso!')
      window.location.href = '/company'
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteClick = async (product: Product) => {
    try {
      await api.delete(`/products/${product.id}/`, {
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

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value)
  }

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredProducts = products.filter((product) => {
    if (searchType === 'id') {
      return product.id.toString().includes(searchValue)
    } else if (searchType === 'name') {
      return product.name.toLowerCase().includes(searchValue.toLowerCase())
    }
  })

  useEffect(() => {
    if (filteredProducts.length < 1) {
      setIsFilterEmpty(false)
    } else {
      setIsFilterEmpty(true)
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row  justify-center gap-6">
        {getCookie('boolform') === false ? (
          <>
            <div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchInputChange}
                placeholder={searchType === 'id' ? 'Id do produto' : 'Nome'}
                className="w-min-full w-fit items-center rounded-md border border-gray-400 p-2 outline-none focus:border-primary"
              />
            </div>
            <div>
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="w-fit  rounded-md border  border-primary-dark bg-primary p-2 font-semibold outline-none"
              >
                <option value="name">Nome</option>
                <option value="id">Id</option>
              </select>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={`${alingLists} ${widthlist} `}>
        {boolforms ? (
          <div className="flex h-full w-[266px] min-w-0 flex-col rounded-3xl p-2">
            <Forms_Product screens={screens} />
          </div>
        ) : (
          filteredProducts.map((product) =>
            product.is_approved !== false ? (
              <></>
            ) : (
              <>
                <div
                  key={product.id}
                  className={`hover:shadow-3xl flex h-[216px] w-[266px] min-w-0 select-none  flex-col rounded-3xl bg-[#F5F5F5]  p-2 shadow-lg shadow-orange-200 transition-all  hover:shadow-orange-500`}
                >
                  <div className="flex justify-center gap-2">
                    <Calendar className="stroke-slate-400" />
                    <p className="text-slate-400">xx/xx/xxxx</p>
                  </div>
                  <hr />
                  <div>
                    <h2 className="font-bold">Novo produto {product.id}</h2>
                    <div className="font-light">
                      <p>
                        Nome:{' '}
                        {product.name.length > 10
                          ? product.name.substring(0, 10) + '...'
                          : product.name}
                      </p>
                      <p>Quantidade: {product.quantity}</p>
                      <p>Categoria: {product.category}</p>
                      <p>Preço: {product.price}</p>
                    </div>
                    <hr></hr>
                    <article className="m-2 flex flex-row flex-nowrap justify-center gap-2">
                      <div
                        className="w-fit cursor-pointer rounded-3xl bg-[#2d7ee7] p-2 text-[#9fc1f4] active:bg-[#1a4a8a]"
                        onClick={() => handleVerifyClick(product)}
                      >
                        <input
                          className="cursor-pointer"
                          type="button"
                          value="Verificar"
                        />
                      </div>
                      <div
                        className="w-fit cursor-pointer rounded-3xl bg-[#6cbe7a83] p-2 text-[#6CBE79] active:bg-[#518f5b]"
                        onClick={() => handleApproveClick(product)}
                      >
                        <input
                          className="cursor-pointer"
                          type="button"
                          value="Aprovar"
                        />
                      </div>
                      <div
                        className="w-fit cursor-pointer rounded-3xl bg-[#fa480771] p-2 text-[#FA4907] active:bg-[hsl(16,70%,33%)]"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <input
                          className="cursor-pointer"
                          type="button"
                          value="Apagar"
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </>
            ),
          )
        )}
        {isFilterEmpty ? (
          <>
            <p> </p>
          </>
        ) : (
          <>
            <p className="select-none px-32 text-[#ffffff00]">.</p>
          </>
        )}
      </div>
    </div>
  )
}
