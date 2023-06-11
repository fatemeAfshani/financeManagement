import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS, ShareHolderIncome } from '../../types'
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
import { useNavigate, useParams } from 'react-router-dom'
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

const userIncomesReducer = (state: IncomeState, action: Action) => {
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

export default function UserIncomes() {
  const [state, dispatch] = useReducer(userIncomesReducer, initialState)
  const { incomes, loading, error, total } = state

  const limit = 10
  const pageCount = Math.ceil(total / limit)
  const [currentPage, setCurrentPage] = useState(1)

  const [checkoutState, setCheckoutState] = useState({ error: '', success: false })

  const { id: userId } = useParams()

  const { user, logout } = useAuth()

  const [checkoutData, setCheckoutData] = useState<{ incomeIds: number[]; amount: number }>({
    incomeIds: [],
    amount: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getStocks = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/incomes/user?id=${userId}&offset=${
            currentPage - 1
          }`,
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

    getStocks()
  }, [currentPage, logout, user, userId])

  const goBack = () => {
    navigate(-1)
  }

  const handleCheckboxChange = (incomeId: number, incomeAmount: number) => {
    if (checkoutData.incomeIds.includes(incomeId)) {
      setCheckoutData((preData) => {
        return {
          incomeIds: preData.incomeIds.filter((id) => id !== incomeId),
          amount: preData.amount - +incomeAmount,
        }
      })
    } else {
      setCheckoutData((preData) => {
        return {
          incomeIds: [...preData.incomeIds, incomeId],
          amount: preData.amount + +incomeAmount,
        }
      })
    }
  }

  const checkout = async () => {
    try {
      if (checkoutData.incomeIds.length === 0) {
        return alert('Please choose some income and try again')
      }
      const description = prompt('Enter some description if you like:')

      let response = await axios({
        method: 'POST',
        url: `${process.env?.REACT_APP_BASE_URL}/checkouts`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          userId: +userId!,
          amount: checkoutData.amount,
          incomeIds: checkoutData.incomeIds,
          description,
        },
      })
      if (response.status === 200) {
        setCheckoutState({ error: '', success: true })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }
      const errorMessage = error.response?.data?.error || 'something went wrong'
      setCheckoutState({ success: false, error: errorMessage })
    }
  }
  return (
    <>
      <h3 className="my-3"> User {userId} Income </h3>
      <button type="button" className="btn btn-primary m-2 " onClick={goBack}>
        Back
      </button>
      <button type="button" className="btn btn-info text-white m-2" onClick={checkout}>
        Checkout
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
      {checkoutState.error && (
        <CAlert color="danger" dismissible>
          <strong>{checkoutState.error}</strong>
        </CAlert>
      )}{' '}
      {checkoutState.success && (
        <CAlert color="success" dismissible>
          <strong>incomes are settled successfully</strong>
        </CAlert>
      )}
      <CTable className=" fs-5 table  bg-white table-striped" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">OrderId</CTableHeaderCell>
            <CTableHeaderCell scope="col">UserId</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Share Percent</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Settled</CTableHeaderCell>
            <CTableHeaderCell scope="col">Check Out</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {incomes.map((income) => {
            return (
              <CTableRow key={income.id}>
                <CTableDataCell>{income.orderId}</CTableDataCell>
                <CTableDataCell>{income.userId}</CTableDataCell>
                <CTableDataCell>{income.amount}</CTableDataCell>
                <CTableDataCell>{income.sharePercent}</CTableDataCell>
                <CTableDataCell>{income.date && convertDate(income.date)}</CTableDataCell>
                <CTableDataCell>{income.isSettled ? 'Yes' : 'No'}</CTableDataCell>
                <CTableDataCell>
                  {!income.isSettled ? (
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheck"
                        onChange={() => handleCheckboxChange(income.id, income.amount)}
                      ></input>
                    </div>
                  ) : (
                    '_'
                  )}
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
