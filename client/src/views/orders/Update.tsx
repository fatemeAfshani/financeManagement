import { CForm, CCol, CFormInput, CButton, CAlert, CFormSelect } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'

type UpdateOrderState = {
  error: string
  message: string
  loading: boolean
}

const initialState: UpdateOrderState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const updateOrderReducer = (state: UpdateOrderState, action: Action) => {
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

export default function UpdateOrder() {
  const [state, dispatch] = useReducer(updateOrderReducer, initialState)
  const { message, loading, error } = state

  const { id: orderId } = useParams()

  const navigate = useNavigate()

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

  const { user, logout } = useAuth()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/orders/${orderId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        const { products, ...rest } = response.data
        setOrder(rest)
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }
    getProduct()
  }, [orderId, logout, user])

  const clickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/orders/${orderId}`,
        method: 'POST',
        data: order,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'order updated successfullty',
      })
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }

      const errorMessage = error.response?.data?.error || 'something went wrong'
      dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
    }
  }
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <h3 className="my-3">Update Order {orderId} </h3>
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
      {message && (
        <CAlert color="success" dismissible>
          <strong>{message}</strong>
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
          <CButton type="submit">Submit</CButton>
        </CCol>
      </CForm>
    </>
  )
}
