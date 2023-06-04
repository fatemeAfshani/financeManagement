import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { errorMessage } from 'src/utils'

const initialState = {
  error: '',
  loading: false,
  products: [],
}

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
}

console.log('#### process.env', process.env)
const productsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.data,
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
  const { products, loading, error } = state

  useEffect(() => {
    dispatch({ type: ACTIONS.CALL_API })
    const getProducts = async () => {
      try {
        let response = await axios({
          method: 'get',
          url: `${process.env?.REACT_APP_BASE_URL}/products`,
          headers: {
            Authorization: `Bearer ${process.env?.REACT_APP_TOKEN}`,
          },
        })
        console.log('### response', response)
        if (response.status == 200) {
          dispatch({ type: ACTIONS.SUCCESS, data: response.data })
          return
        }
      } catch (error) {
        console.log('### error', errorMessage(error))
        dispatch({ type: ACTIONS.ERROR, error: errorMessage(error) })
      }
    }

    getProducts()
  }, [])
  return (
    <>
      <h2 className="my-3">Products list</h2>
      {error ? error : ''}
      {loading ? loading : ''}
      <div className="bg-white">
        <CTable hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">id</CTableHeaderCell>
              <CTableHeaderCell scope="col">name</CTableHeaderCell>
              <CTableHeaderCell scope="col">price</CTableHeaderCell>
              <CTableHeaderCell scope="col">isDeleted</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {products.map((product) => {
              return (
                <CTableRow key={product.id}>
                  <CTableHeaderCell scope="row">{product.id}</CTableHeaderCell>
                  <CTableDataCell>{product.name}</CTableDataCell>
                  <CTableDataCell>{product.price}</CTableDataCell>
                  <CTableDataCell>{product.isDeleted ? 'true' : 'false'}</CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}
