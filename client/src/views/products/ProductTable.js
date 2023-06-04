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
import { useAuth } from 'src/components/Auth'
import axios from 'axios'

const initialState = {
  error: '',
  loading: false,
  products: [],
  total: 0,
}

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
}

const productsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return {
        ...state,
        error: '',
        loading: true,
      }
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.data.products,
        total: action.data.productsCount,
      }
    }
    case ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    default: {
      return state
    }
  }
}

export default function ProductTable() {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const { products, loading, error, total } = state
  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)

  const { token, logout } = useAuth()
  useEffect(() => {
    dispatch({ type: ACTIONS.CALL_API })
    const getProducts = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/products?offset=${currentPage - 1}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        dispatch({ type: ACTIONS.SUCCESS, data: response.data })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error?.[0] || 'something went wrong'
        dispatch({ type: ACTIONS.ERROR, error: errorMessage })
      }
    }

    getProducts()
  }, [logout, token, currentPage])
  return (
    <>
      <h3 className="my-3">Products list</h3>
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
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">name</CTableHeaderCell>
            <CTableHeaderCell scope="col">price</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.map((product) => {
            return (
              <CTableRow key={product.id}>
                <CTableHeaderCell scope="row">{product.id}</CTableHeaderCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.price}</CTableDataCell>
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
