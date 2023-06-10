import { CForm, CCol, CFormInput, CButton, CAlert } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import { API_ACTIONS } from '../../types'

type UpdateUserState = {
  error: string
  message: string
  loading: boolean
}

const initialState: UpdateUserState = {
  error: '',
  loading: false,
  message: '',
}
type Action = {
  type: API_ACTIONS
  error?: string
  message?: string
}

const UpdateUserReducer = (state: UpdateUserState, action: Action) => {
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

export default function UpdateUser() {
  const [state, dispatch] = useReducer(UpdateUserReducer, initialState)
  const { message, loading, error } = state

  const [userData, setUser] = useState({
    username: '',
    id: 0,
    isShareHolder: false,
    sharePercent: 0,
    role: '',
    companyId: '',
  })

  const { user, logout } = useAuth()

  const { id: userId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/users?id=${userId}`,
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
  }, [userId, logout, user])

  const userUpdateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/users/update`,
        method: 'POST',
        data: {
          id: userData.id,
          role: userData.role,
          username: userData.username,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'user data updated successfullty',
      })
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }

      const errorMessage = error.response?.data?.error || 'something went wrong'
      dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
    }
  }
  const shareHolderUpdateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: API_ACTIONS.CALL_API })
    try {
      await axios({
        url: `${process.env?.REACT_APP_BASE_URL}/users/shareholder`,
        method: 'POST',
        data: {
          users: [
            {
              id: userData.id,
              isShareHolder: userData.isShareHolder,
              sharePercent: userData.sharePercent,
            },
          ],
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      dispatch({
        type: API_ACTIONS.SUCCESS,
        message: 'share holder data updated successfullty',
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
      <h3 className="my-3">Update User {userId}</h3>
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
      <CForm className="row g-3 fs-5 my-3 p-3 bg-white" onSubmit={userUpdateHandler}>
        <CCol xs={6}>
          <CFormInput
            type="name"
            id="username"
            placeholder="enter username"
            value={userData.username}
            onChange={(e) =>
              setUser((preUser) => {
                return { ...preUser, username: e.target.value }
              })
            }
            label="Username"
          />
        </CCol>
        <CCol xs={6}>
          <label htmlFor="select role" className="form-label">
            Role
          </label>

          <select
            className="form-select"
            aria-label="select role"
            value={userData.role}
            onChange={(e) =>
              setUser((preUser) => {
                return { ...preUser, role: e.target.value }
              })
            }
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Submit</CButton>
        </CCol>
      </CForm>
      <CForm className="row g-3 fs-5 my-3 p-3 bg-white" onSubmit={shareHolderUpdateHandler}>
        <CCol xs={6}>
          <label htmlFor="select role" className="form-label">
            Role
          </label>

          <select
            className="form-select"
            aria-label="select role"
            value={userData.isShareHolder ? 'true' : 'false'}
            onChange={(e) =>
              setUser((preUser) => {
                return { ...preUser, isShareHolder: e.target.value === 'true' ? true : false }
              })
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </CCol>
        <CCol xs={6}>
          <CFormInput
            type="number"
            step="0.1"
            id="sharePercent"
            placeholder="enter sharePercent"
            value={userData.sharePercent}
            onChange={(e) =>
              setUser((preDate) => {
                return { ...preDate, sharePercent: +e.target.value }
              })
            }
            label="Share Percent"
          />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Submit</CButton>
        </CCol>
      </CForm>
    </>
  )
}
