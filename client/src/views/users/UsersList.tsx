import {
  CAlert,
  CButton,
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
import { API_ACTIONS, Company, User } from '../../types'
import { useNavigate } from 'react-router-dom'
import { convertDate } from '../../utils'

type UsersState = {
  error: string
  loading: boolean
  users: User[]
  company?: Company
}
const initialState: UsersState = {
  error: '',
  loading: false,
  users: [],
}

type Action = {
  type: API_ACTIONS
  users?: User[]
  company?: Company
  error?: string
}

const usersReducer = (state: UsersState, action: Action) => {
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
        users: action.users || [],
        company: action.company,
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

export default function UserList() {
  const [state, dispatch] = useReducer(usersReducer, initialState)
  const { users, loading, error, company } = state

  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [deleteState, setDeleteState] = useState({ error: '', success: false })

  useEffect(() => {
    dispatch({ type: API_ACTIONS.CALL_API })
    const getusers = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/users/company`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        dispatch({
          type: API_ACTIONS.SUCCESS,
          users: response.data.users,
          company: response.data.company,
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        dispatch({ type: API_ACTIONS.ERROR, error: errorMessage })
      }
    }

    getusers()
  }, [logout, user])

  const clickHandlerUpdate = (userId: number) => {
    navigate(`/users/update/${userId}`)
  }

  const deleteHandler = async (userId: number) => {
    try {
      let response = await axios({
        method: 'DELETE',
        url: `${process.env?.REACT_APP_BASE_URL}/users/${userId}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (response.status === 200) {
        setDeleteState({ error: '', success: true })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        logout()
      }
      const errorMessage = error.response?.data?.error || 'something went wrong'
      setDeleteState({ success: false, error: errorMessage })
    }
  }
  return (
    <>
      <h3 className="my-3">Users list</h3>
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
      {deleteState.error && (
        <CAlert color="danger" dismissible>
          <strong>{deleteState.error}</strong>
        </CAlert>
      )}{' '}
      {deleteState.success && (
        <CAlert color="success" dismissible>
          <strong>Product deleted successfully</strong>
        </CAlert>
      )}
      <CTable className=" fs-5 table  bg-white table-striped" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">CompanyName</CTableHeaderCell>
            <CTableHeaderCell scope="col">Share Percent</CTableHeaderCell>
            <CTableHeaderCell scope="col">Create Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{company?.name}</CTableDataCell>
            <CTableDataCell>{company?.sharePercent}</CTableDataCell>
            <CTableDataCell>{company?.createdAt && convertDate(company.createdAt)}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CTable className=" fs-5 table  bg-white table-striped" hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Is Share Holder</CTableHeaderCell>
            <CTableHeaderCell scope="col">SharePercent</CTableHeaderCell>
            <CTableHeaderCell scope="col">Update</CTableHeaderCell>
            <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => {
            return (
              <CTableRow key={user.id}>
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>{user.isShareHolder ? 'yes' : 'no'}</CTableDataCell>
                <CTableDataCell>{user.sharePercent}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    variant="outline"
                    className="mx-3"
                    onClick={() => clickHandlerUpdate(user.id)}
                  >
                    Update
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    variant="outline"
                    className="mx-3"
                    onClick={() => deleteHandler(user.id)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
    </>
  )
}
