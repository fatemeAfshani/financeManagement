import { CForm, CCol, CFormInput, CButton, CAlert } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'

type UpdateProductState = {
  error: string
  message: string
  loading: boolean
}

const initialState: UpdateProductState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const UpdateProductsReducer = (state: UpdateProductState, action: Action) => {
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

export default function UpdateProduct() {
  const [state, dispatch] = useReducer(UpdateProductsReducer, initialState)
  const { message, loading, error } = state

  const [product, setProduct] = useState({
    name: '',
    price: 0,
  })

  const { user, logout } = useAuth()

  const { id: productId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/products/${productId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        setProduct(response.data)
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }
    getProduct()
  }, [productId, logout, user])

  const clickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/products/${productId}`,
        method: 'POST',
        data: {
          ...product,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'product updated successfullty',
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
      <h3 className="my-3">Update Product ${productId}</h3>
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
        <CCol xs={6}>
          <CFormInput
            type="name"
            id="inputName"
            placeholder="enter product name"
            value={product.name}
            onChange={(e) =>
              setProduct((preProduct) => {
                return { ...preProduct, name: e.target.value }
              })
            }
            label="Product Name"
          />
        </CCol>

        <CCol xs={6}>
          <CFormInput
            type="number"
            step="0.1"
            id="inputPrice"
            placeholder="enter price"
            value={product.price}
            onChange={(e) =>
              setProduct((preProduct) => {
                return { ...preProduct, price: +e.target.value }
              })
            }
            label="Price"
          />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Submit</CButton>
        </CCol>
      </CForm>
    </>
  )
}
