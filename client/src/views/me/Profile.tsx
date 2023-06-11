import { CAlert } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'

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

  const [userData, setUser] = useState({
    username: '',
    id: 0,
    isShareHolder: false,
    sharePercent: 0,
    role: '',
    companyId: '',
    isDeleted: false,
  })

  const { user, logout } = useAuth()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/users`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setUser({ ...response.data, sharePercent: +response.data.sharePercent })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }
    getUser()
  }, [logout, user])

  return (
    <>
      <h3 className="my-3">Profile</h3>
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
            <strong>User id: </strong> {userData.id}
          </p>
          <p>
            <strong>Username: </strong> {userData.username}
          </p>
          <p>
            <strong>Role: </strong>
            {userData.role}
          </p>
          <p>
            <strong>CompanyId: </strong> {userData.companyId}
          </p>
          <p>
            <strong>Share Holder: </strong>
            {userData.isShareHolder ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Share Percent: </strong> %{userData.sharePercent}
          </p>
        </div>
      )}
    </>
  )
}
