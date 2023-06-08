import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, ProductStock } from '../../types'
import {
  CAlert,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'

type ProductStockState = {
  error: string
  loading: boolean
  stocks: ProductStock[]
}
const initialState: ProductStockState = {
  error: '',
  loading: false,
  stocks: [],
}

type Action = {
  type: API_ACTIONS
  stocks?: ProductStock[]
  error?: string
}

const productStocksReducer = (state: ProductStockState, action: Action) => {
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
        stocks: action.stocks || [],
      }
    }
    case API_ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error || '',
      }
    }

    default: {
      return state
    }
  }
}

export default function ProductStocks() {
  const [state, dispatch] = useReducer(productStocksReducer, initialState)
  const { stocks, loading, error } = state

  const { id: productId } = useParams()

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getStocks = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/stocks/product/${productId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          stocks: response.data,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getStocks()
  }, [logout, user, productId])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <h3 className="my-3"> {stocks?.[0]?.name} stock</h3>
      <button type="button" className="btn btn-primary my-3" onClick={goBack}>
        Back
      </button>
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

      <CTable className=" fs-5 table  bg-white table-striped" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ProductId</CTableHeaderCell>
            <CTableHeaderCell scope="col">name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Buy Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">sell Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {stocks.map((stock) => {
            return (
              <CTableRow key={stock.id}>
                <CTableDataCell>{stock.productId}</CTableDataCell>
                <CTableDataCell>{stock.name}</CTableDataCell>
                <CTableDataCell>{stock.buyPrice}</CTableDataCell>
                <CTableDataCell>{stock.price}</CTableDataCell>
                <CTableDataCell>{stock.amount}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}
