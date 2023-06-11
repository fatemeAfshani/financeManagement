import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, ShareHolderIncome } from '../../types'
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

type IncomeState = {
  error: string
  loading: boolean
  incomes: ShareHolderIncome[]
}

const initialState: IncomeState = {
  error: '',
  loading: false,
  incomes: [],
}

type Action = {
  type: API_ACTIONS
  incomes?: ShareHolderIncome[]
  error?: string
}

const orderIncomesReducer = (state: IncomeState, action: Action) => {
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
        incomes: action.incomes || [],
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

export default function OrderIncomes() {
  const [state, dispatch] = useReducer(orderIncomesReducer, initialState)
  const { incomes, loading, error } = state

  const { id: orderId } = useParams()

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getStocks = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/incomes/order/${orderId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          incomes: response.data,
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
  }, [logout, user, orderId])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      <h3 className="my-3"> Order {orderId} Income </h3>
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
            <CTableHeaderCell scope="col">UserId</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Company Income</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Share Percent</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Settled</CTableHeaderCell>
            <CTableHeaderCell scope="col">CheckOutId</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {incomes.map((income) => {
            return (
              <CTableRow key={income.id}>
                <CTableDataCell>{income.userId}</CTableDataCell>
                <CTableDataCell>{income.isCompanyIncome ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>{income.amount}</CTableDataCell>
                <CTableDataCell>{income.sharePercent}</CTableDataCell>
                <CTableDataCell>{income.date}</CTableDataCell>
                <CTableDataCell>{income.isSettled ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>{income.checkoutId || '_'} </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}
