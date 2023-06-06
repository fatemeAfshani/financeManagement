import { CForm, CRow, CFormLabel, CCol, CFormInput, CButton } from '@coreui/react'
import axios from 'axios'
import React, { useReducer, useState } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'

type AddProductState = {
  error: string
  message: string
  loading: boolean
}

const initialState: AddProductState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const AddProductsReducer = (state: AddProductState, action: Action) => {
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

export default function AddProduct() {
  const [state, dispatch] = useReducer(AddProductsReducer, initialState)
  const { message, loading, error } = state
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  })
  const { user, logout } = useAuth()

  const clickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/products`,
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
      <h3 className="my-3">Add new Product</h3>
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
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <CRow>
        <CCol xs={6}>
          <CForm onSubmit={clickHandler} className=" p-3 ">
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputName" className="col-sm-2 col-form-label">
                ProductName
              </CFormLabel>
              <CCol sm={10}>
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
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPrice" className="col-sm-2 col-form-label">
                Price
              </CFormLabel>
              <CCol sm={10}>
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
                />
              </CCol>
            </CRow>

            <CButton type="submit">Submit</CButton>
          </CForm>
        </CCol>
      </CRow>
    </>
  )
}
