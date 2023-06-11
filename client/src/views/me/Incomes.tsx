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
import { API_ACTIONS, ShareHolderIncome } from '../../types'
import { convertDate } from '../../utils'

type IncomeState = {
  error: string
  loading: boolean
  incomes: ShareHolderIncome[]
  total: number
}
const initialState: IncomeState = {
  error: '',
  loading: false,
  incomes: [],
  total: 0,
}

type Action = {
  type: API_ACTIONS
  incomes?: ShareHolderIncome[]
  incomesCount?: number
  error?: string
}

const myIncomeReducer = (state: IncomeState, action: Action) => {
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
        total: action.incomesCount || 0,
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

export default function MyIncomes() {
  const [state, dispatch] = useReducer(myIncomeReducer, initialState)
  const { incomes, loading, error, total } = state

  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)

  const { user, logout } = useAuth()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getincomes = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/incomes/user?offset=${currentPage - 1}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          incomes: response.data.incomes,
          incomesCount: response.data.incomesCount,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getincomes()
  }, [logout, user, currentPage])

  return (
    <>
      <h3 className="my-3">My Income</h3>
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
            <CTableHeaderCell scope="col">Order Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Share Percent</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Settled</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checkout Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {incomes.map((income) => {
            return (
              <CTableRow key={income.id}>
                <CTableDataCell>{income.orderId}</CTableDataCell>
                <CTableDataCell>{income.amount}</CTableDataCell>
                <CTableDataCell>{income.sharePercent}</CTableDataCell>
                <CTableDataCell>{income.isSettled ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>{income.checkoutId || '_'}</CTableDataCell>
                <CTableDataCell>{income.date && convertDate(income.date)}</CTableDataCell>
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
