import React, { useEffect, useReducer, useState } from 'react'
import { CAlert } from '@coreui/react'
import axios from 'axios'
import copy from 'copy-to-clipboard'

import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'
import { convertDate } from '../../utils'

type profileState = {
  error: string
  message: string
  loading: boolean
}

const initialState: profileState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const profileReducer = (state: profileState, action: Action) => {
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

export default function Profile() {
  const [state, dispatch] = useReducer(profileReducer, initialState)
  const { message, loading, error } = state

  const [company, setCompany] = useState({
    id: 0,
    name: '',
    createdAt: '',
    sharePercent: 0,
    uuid: '',
  })

  const { user, logout } = useAuth()

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/company`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setCompany(response.data)
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }
    getCompany()
  }, [logout, user])

  return (
    <>
      <h3 className="my-3">Compnay Profile</h3>
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
      {user && (
        <div className="fs-4 p-3  bg-white rounded">
          <p>
            <strong>Company id: </strong> {company.id}
          </p>
          <p>
            <strong>name: </strong> {company.name}
          </p>
          <p>
            <strong>Date: </strong>
            {company.createdAt && convertDate(company.createdAt)}
          </p>
          <p>
            <strong>Share Percent: </strong> %{company.sharePercent}
          </p>
          <p>
            <strong>Code: </strong> {company.uuid}
            <button
              type="button"
              className="btn btn-primary text-white m-3"
              onClick={() => copy(company.uuid)}
            >
              Copy
            </button>
          </p>
          <p className="text-danger">for user registration, give above code to new user</p>
        </div>
      )}
    </>
  )
}
