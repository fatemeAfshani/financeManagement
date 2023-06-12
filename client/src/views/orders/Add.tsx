import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CAlert,
  CFormSelect,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, Product } from '../../types'

type AddOrderState = {
  error: string
  message: string
  loading: boolean
}

const initialState: AddOrderState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const AddOrderReducer = (state: AddOrderState, action: Action) => {
  switch (action.type) {
    case API_ACTIONS.CALL_API: {
      return {
        ...state,
        error: '',
        loading: true,
      }
    }
    case API_ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        message: action.message || '',
        error: '',
      }
    }
    case API_ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error || '',
        message: '',
      }
    }

    default: {
      return state
    }
  }
}

type Data = {
  products: Product[]
  errorMessage: string
}

type OrderProduct = {
  productId: number
  amount: number
  sellPrice: number
  name: string
}

export default function AddOrder() {
  const [state, dispatch] = useReducer(AddOrderReducer, initialState)
  const { message, loading, error } = state
  const [order, setOrder] = useState({
    name: '',
    address: '',
    phone: '',
    postalCode: '',
    trackingCode: '',
    orderDate: '',
    shippingDate: '',
    shippingPriceCustomer: 0,
    shippingPriceSeller: 0,
    sellFrom: '',
    discount: 0,
  })

  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([])

  const [searchName, setSearchName] = useState('')
  const [data, setData] = useState<Data>({
    products: [],
    errorMessage: '',
  })
  const { user, logout } = useAuth()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = searchName
          ? `${process.env?.REACT_APP_BASE_URL}/products/search/name?name=${searchName}`
          : `${process.env?.REACT_APP_BASE_URL}/products`

        const response = await axios({
          url,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setData({ errorMessage: '', products: response.data.products || response.data })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }

        const errorMessage = error.response?.data?.error || 'something went wrong'
        setData({ errorMessage, products: [] })
      }
    }

    getProducts()
  }, [searchName, user, logout])

  const clickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/orders`,
        method: 'POST',
        data: {
          ...order,
          products: [...orderProducts],
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'order added successfullty',
      })
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }

      const errorMessage = error.response?.data?.error || 'something went wrong'
      dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
    }
  }

  return (
    <>
      {user?.role === 'admin' && (
        <>
          <h3 className="my-3">Add New Order</h3>
          {error && (
            <CAlert color="danger" dismissible>
              <strong>{error}</strong>
            </CAlert>
          )}
          {loading && (
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {message && (
            <CAlert color="success" dismissible>
              <strong>{message}</strong>
            </CAlert>
          )}
          {data.errorMessage && (
            <CAlert color="danger" dismissible>
              <strong>{data.errorMessage}</strong>
            </CAlert>
          )}
          <CForm className="row g-3 fs-5 my-3 p-3 bg-white" onSubmit={clickHandler}>
            <CCol xs={12}>
              <CFormInput
                type="text"
                id="name"
                placeholder="enter customer name"
                value={order.name}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, name: e.target.value }
                  })
                }
                label="Name"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                id="address"
                placeholder="enter customer address"
                value={order.address}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, address: e.target.value }
                  })
                }
                label="Address"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="phone"
                maxLength={11}
                placeholder="enter customer phone"
                value={order.phone}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, phone: e.target.value }
                  })
                }
                label="Phone"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="postalCode"
                maxLength={10}
                placeholder="enter postalCode"
                value={order.postalCode}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, postalCode: e.target.value }
                  })
                }
                label="PostalCode"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="trackingCode"
                placeholder="enter trackingCode"
                value={order.trackingCode}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, trackingCode: e.target.value }
                  })
                }
                label="TrackingCode"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="orderDate"
                minLength={6}
                maxLength={6}
                placeholder="021125"
                value={order.orderDate}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, orderDate: e.target.value }
                  })
                }
                label="OrderDate sample:(021125)"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                id="shippingDate"
                minLength={6}
                maxLength={6}
                placeholder="021125"
                value={order.shippingDate}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, shippingDate: e.target.value }
                  })
                }
                label="ShippingDate sample:(021125)"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                step="0.10"
                id="shippingPriceCustomer"
                placeholder="enter customer shipping price"
                value={order.shippingPriceCustomer}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, shippingPriceCustomer: +e.target.value }
                  })
                }
                label="Customer shipping price"
              />
            </CCol>

            <CCol xs={12}>
              <CFormInput
                type="number"
                step="0.10"
                id="shippingPriceSeller"
                placeholder="enter seller shipping price"
                value={order.shippingPriceSeller}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, shippingPriceSeller: +e.target.value }
                  })
                }
                label="Seller shipping price"
              />
            </CCol>
            <CCol xs={12}>
              <CFormSelect
                aria-label="Default select example"
                label="Sell From"
                options={[
                  { label: 'Site', value: 'site' },
                  { label: 'Instagram', value: 'instagram' },
                ]}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, sellFrom: e.target.value }
                  })
                }
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                step="0.10"
                id="discount"
                placeholder="enter discount"
                value={order.discount}
                onChange={(e) =>
                  setOrder((preOrder) => {
                    return { ...preOrder, discount: +e.target.value }
                  })
                }
                label="Discount"
              />
            </CCol>
            <CCol xs={12}>
              <CListGroup>
                {orderProducts.length > 0 &&
                  orderProducts.map((product) => {
                    return (
                      <CListGroupItem key={product.productId}>
                        <span className="mx-2">{product.name}</span>
                        <CButton
                          variant="outline"
                          className="mx-2"
                          onClick={() => {
                            const newProducts = orderProducts.map((oProduct) => {
                              if (oProduct.productId === product.productId) {
                                oProduct.amount -= 1
                              }
                              return oProduct
                            })
                            setOrderProducts(newProducts)
                          }}
                        >
                          -
                        </CButton>
                        <span className="mx-2">{product.amount}</span>
                        <CButton
                          className="mx-2"
                          variant="outline"
                          onClick={() => {
                            const newProducts = orderProducts.map((oProduct) => {
                              if (oProduct.productId === product.productId) {
                                oProduct.amount += 1
                              }
                              return oProduct
                            })
                            setOrderProducts(newProducts)
                          }}
                        >
                          +
                        </CButton>
                        <CButton
                          className="mx-2"
                          color="danger"
                          variant="outline"
                          onClick={() => {
                            const filteredProducts = orderProducts.filter(
                              (pro) => pro.productId !== product.productId,
                            )
                            setOrderProducts(filteredProducts)
                          }}
                        >
                          delete
                        </CButton>
                      </CListGroupItem>
                    )
                  })}
              </CListGroup>
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="text"
                id="name"
                placeholder="enter product name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                label="Product"
              />
              <CFormSelect
                htmlSize={7}
                multiple
                className="fs-5"
                aria-label="size 7 select example"
                onChange={(e) => {
                  setOrderProducts((preOrderProducts) => {
                    const newProduct = JSON.parse(e.target.value)

                    const objIndex = preOrderProducts.findIndex(
                      (x) => x.productId === newProduct.productId,
                    )
                    if (objIndex === -1) {
                      return [...preOrderProducts, newProduct]
                    }
                    return [...preOrderProducts]
                  })
                }}
              >
                {data.products.map((product) => {
                  return (
                    <option
                      value={`{"productId": ${product.id}, "sellPrice": ${product.price}, "amount": 1, "name": "${product.name}"}`}
                      key={product.id}
                    >
                      {product.name}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CButton type="submit">Submit</CButton>
            </CCol>
          </CForm>
        </>
      )}
    </>
  )
}
