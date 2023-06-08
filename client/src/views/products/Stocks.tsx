import {
  CAlert,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, ProductStock } from '../../types'

type StocksState = {
  error: string
  loading: boolean
  stocks: ProductStock[]
  total: number
}
const initialState: StocksState = {
  error: '',
  loading: false,
  stocks: [],
  total: 0,
}

type Action = {
  type: API_ACTIONS
  stocks?: ProductStock[]
  stocksCount?: number
  error?: string
}

const stockReducer = (state: StocksState, action: Action) => {
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
        total: action.stocksCount || 0,
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

export default function Stocks() {
  const [state, dispatch] = useReducer(stockReducer, initialState)
  const { stocks, loading, error, total } = state
  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)
  const { user, logout } = useAuth()
  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getStock = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/stocks?offset=${currentPage - 1}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          stocks: response.data.stocks,
          stocksCount: response.data.stocksCount,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getStock()
  }, [logout, user, currentPage])

  return (
    <>
      <h3 className="my-3">Stock list</h3>
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
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Buy Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {stocks.map((stock) => {
            return (
              <CTableRow key={stock.id}>
                <CTableHeaderCell scope="row">{stock.id}</CTableHeaderCell>
                <CTableDataCell>{stock.productId}</CTableDataCell>
                <CTableDataCell>{stock.name}</CTableDataCell>
                <CTableDataCell>{stock.buyPrice}</CTableDataCell>
                <CTableDataCell>{stock.amount}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CPagination className=" " aria-label="Page navigation">
        <CPaginationItem
          onClick={() => setCurrentPage((prePage) => prePage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </CPaginationItem>
        {currentPage !== 1 && (
          <CPaginationItem onClick={() => setCurrentPage((prePage) => prePage - 1)}>
            {currentPage - 1}
          </CPaginationItem>
        )}
        <CPaginationItem active>{currentPage}</CPaginationItem>
        {currentPage !== pageCount && (
          <CPaginationItem onClick={() => setCurrentPage((prePage) => prePage + 1)}>
            {currentPage + 1}
          </CPaginationItem>
        )}
        <CPaginationItem
          onClick={() => setCurrentPage((prePage) => prePage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </CPaginationItem>
      </CPagination>
    </>
  )
}
