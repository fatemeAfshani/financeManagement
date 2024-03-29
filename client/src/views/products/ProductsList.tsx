import {
  CAlert,
  CButton,
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
import { API_ACTIONS, Product } from '../../types'
import { useNavigate } from 'react-router-dom'

type ProductState = {
  error: string
  loading: boolean
  products: Product[]
  total: number
}
const initialState: ProductState = {
  error: '',
  loading: false,
  products: [],
  total: 0,
}

type Action = {
  type: API_ACTIONS
  products?: Product[]
  productsCount?: number
  error?: string
}

const productsReducer = (state: ProductState, action: Action) => {
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
        products: action.products || [],
        total: action.productsCount || 0,
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

export default function ProductList() {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const { products, loading, error, total } = state
  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteState, setDeleteState] = useState({ error: '', success: false })
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getProducts = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/products?offset=${currentPage - 1}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          products: response.data.products,
          productsCount: response.data.productsCount,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getProducts()
  }, [logout, user, currentPage])

  const clickHandlerStock = (productId: number) => {
    navigate(`/product/stock/${productId}`)
  }
  const clickHandlerInvoice = (productId: number) => {
    navigate(`/product/invoices/${productId}`)
  }
  const clickHandlerOrder = (productId: number) => {
    navigate(`/product/orders/${productId}`)
  }

  const clickHandlerUpdate = (productId: number) => {
    navigate(`/product/update/${productId}`)
  }

  const deleteHandler = async (productId: number) => {
    try {
      let response = await axios({
        method: 'DELETE',
        url: `${process.env?.REACT_APP_BASE_URL}/products/${productId}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.status === 200) {
        setDeleteState({ error: '', success: true })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }
      const errorMessage = error.response?.data?.error || 'something went wrong'
      setDeleteState({ success: false, error: errorMessage })
    }
  }

  return (
    <>
      <h3 className="my-3">Products list</h3>
      {error && (
        <CAlert color="danger" dismissible>
          <strong>{error}</strong>
        </CAlert>
      )}{' '}
      {deleteState.error && (
        <CAlert color="danger" dismissible>
          <strong>{deleteState.error}</strong>
        </CAlert>
      )}{' '}
      {deleteState.success && (
        <CAlert color="success" dismissible>
          <strong>Product deleted successfully</strong>
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
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Stock</CTableHeaderCell>
            <CTableHeaderCell scope="col">Invoices</CTableHeaderCell>
            <CTableHeaderCell scope="col">Orders</CTableHeaderCell>
            {user?.role === 'admin' && (
              <>
                <CTableHeaderCell scope="col">Update</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
              </>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.map((product) => {
            return (
              <CTableRow key={product.id}>
                <CTableHeaderCell scope="row">{product.id}</CTableHeaderCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.price}</CTableDataCell>
                <CTableDataCell>
                  <span>{product.amount}</span>
                  <CButton
                    color="primary"
                    variant="outline"
                    className="mx-3"
                    onClick={() => clickHandlerStock(product.id)}
                  >
                    View details
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    variant="outline"
                    className="mx-3"
                    onClick={() => clickHandlerInvoice(product.id)}
                  >
                    View
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="success"
                    variant="outline"
                    className="mx-3"
                    onClick={() => clickHandlerOrder(product.id)}
                  >
                    View
                  </CButton>
                </CTableDataCell>
                {user?.role === 'admin' && (
                  <>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        variant="outline"
                        className="mx-3"
                        onClick={() => clickHandlerUpdate(product.id)}
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        variant="outline"
                        className="mx-3"
                        onClick={() => deleteHandler(product.id)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </>
                )}
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
