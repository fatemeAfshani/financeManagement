import { CForm, CCol, CFormInput, CButton, CAlert, CFormSelect } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, Product } from '../../types'

type AddInvoiceState = {
  error: string
  message: string
  loading: boolean
}

const initialState: AddInvoiceState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const AddInvoiceReducer = (state: AddInvoiceState, action: Action) => {
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

export default function AddInvoice() {
  const [state, dispatch] = useReducer(AddInvoiceReducer, initialState)
  const { message, loading, error } = state
  const [invoice, setInvoice] = useState({
    productId: 0,
    amount: 0,
    pricePerOne: 0,
  })

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
        url: `${process.env?.REACT_APP_BASE_URL}/invoices`,
        method: 'POST',
        data: {
          ...invoice,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'product added successfullty',
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
          <h3 className="my-3">Add New Invoice</h3>
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
                onChange={(e) =>
                  setInvoice((preInvoice) => {
                    return { ...preInvoice, productId: +e.target.value }
                  })
                }
              >
                {data.products.map((product) => {
                  return (
                    <option value={product.id} key={product.id}>
                      {product.name}
                    </option>
                  )
                })}
              </CFormSelect>
            </CCol>

            <CCol xs={12}>
              <CFormInput
                type="number"
                id="amount"
                placeholder="enter amount"
                value={invoice.amount}
                onChange={(e) =>
                  setInvoice((preInvoice) => {
                    return { ...preInvoice, amount: +e.target.value }
                  })
                }
                label="Amount"
              />
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                step="0.10"
                id="pricePerOne"
                placeholder="enter price per one"
                value={invoice.pricePerOne}
                onChange={(e) =>
                  setInvoice((preInvoice) => {
                    return { ...preInvoice, pricePerOne: +e.target.value }
                  })
                }
                label="Price Per One"
              />
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
