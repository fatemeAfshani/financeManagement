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
import { API_ACTIONS, Order } from '../../types'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerDataModal from '../orders/modals/customerDataModal'
import ProductsModal from '../orders/modals/ProductsModal'

type OrdersState = {
  error: string
  loading: boolean
  orders: Order[]
  total: number
}
const initialState: OrdersState = {
  error: '',
  loading: false,
  orders: [],
  total: 0,
}

type Action = {
  type: API_ACTIONS
  orders?: Order[]
  ordersCount?: number
  error?: string
}

const orderReducer = (state: OrdersState, action: Action) => {
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
        orders: action.orders || [],
        total: action.ordersCount || 0,
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

export default function Orders() {
  const [state, dispatch] = useReducer(orderReducer, initialState)
  const { orders, loading, error, total } = state
  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)
  const { user, logout } = useAuth()
  const { id: productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getOrders = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/orders/product/${productId}?offset=${
            currentPage - 1
          }`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          orders: response.data.orders,
          ordersCount: response.data.ordersCount,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getOrders()
  }, [logout, user, currentPage, productId])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <h3 className="my-3">Product {productId} orders</h3>
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
      <CTable className="  table  bg-white table-striped" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
            <CTableHeaderCell scope="col">OrderDate</CTableHeaderCell>
            <CTableHeaderCell scope="col">ShippingDate</CTableHeaderCell>
            <CTableHeaderCell scope="col">ShippingPriceCustomer</CTableHeaderCell>
            <CTableHeaderCell scope="col">ShippingPriceSeller</CTableHeaderCell>
            <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
            <CTableHeaderCell scope="col">TotalProfit</CTableHeaderCell>
            <CTableHeaderCell scope="col">SellFrom</CTableHeaderCell>
            <CTableHeaderCell scope="col">Products</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {orders.map((order) => {
            return (
              <CTableRow key={order.id}>
                <CTableHeaderCell scope="row">{order.id}</CTableHeaderCell>
                <CTableDataCell>
                  {order.name}{' '}
                  <CustomerDataModal
                    data={{
                      name: order.name,
                      address: order.address,
                      phone: order.phone,
                      postalCode: order.postalCode,
                      trackingCode: order.trackingCode,
                    }}
                    id={order.id}
                  ></CustomerDataModal>
                </CTableDataCell>

                <CTableDataCell>{order.orderDate}</CTableDataCell>
                <CTableDataCell>{order.shippingDate}</CTableDataCell>
                <CTableDataCell>{order.shippingPriceCustomer}</CTableDataCell>
                <CTableDataCell>{order.shippingPriceSeller}</CTableDataCell>
                <CTableDataCell>{order.discount}</CTableDataCell>
                <CTableDataCell>{order.totalProfit}</CTableDataCell>
                <CTableDataCell>{order.sellFrom}</CTableDataCell>
                <CTableDataCell>
                  <ProductsModal data={order.products} id={order.id}></ProductsModal>
                </CTableDataCell>
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
