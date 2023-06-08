import {
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
import { API_ACTIONS, ProductInvoice } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'

type InvoicesState = {
  error: string
  loading: boolean
  invoices: ProductInvoice[]
  total: number
}
const initialState: InvoicesState = {
  error: '',
  loading: false,
  invoices: [],
  total: 0,
}

type Action = {
  type: API_ACTIONS
  invoices?: ProductInvoice[]
  invoicesCount?: number
  error?: string
}

const invoiceReducer = (state: InvoicesState, action: Action) => {
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
        invoices: action.invoices || [],
        total: action.invoicesCount || 0,
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
  const [state, dispatch] = useReducer(invoiceReducer, initialState)
  const { invoices, loading, error, total } = state
  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)
  const { user, logout } = useAuth()
  const { id: productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getInvoices = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/invoices/product/${productId}?offset=${
            currentPage - 1
          }`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          invoices: response.data.invoices,
          invoicesCount: response.data.invoicesCount,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getInvoices()
  }, [logout, user, currentPage, productId])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <h3 className="my-3">Product {productId} invoices</h3>
      <button type="button" className="btn btn-primary my-3" onClick={goBack}>
        Back
      </button>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
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
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price Per One</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {invoices.map((invoice) => {
            return (
              <CTableRow key={invoice.id}>
                <CTableHeaderCell scope="row">{invoice.id}</CTableHeaderCell>
                <CTableDataCell>{invoice.productId}</CTableDataCell>
                <CTableDataCell>{invoice.amount}</CTableDataCell>
                <CTableDataCell>{invoice.pricePerOne}</CTableDataCell>
                <CTableDataCell>{invoice.date}</CTableDataCell>
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
