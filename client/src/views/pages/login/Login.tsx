import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useAuth } from '../../../components/context/AuthContext'

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  const redirectPath = location.state?.path || '/'
  if (user?.token) navigate(redirectPath)

  const clickHandler = async () => {
    try {
      let response = await axios({
        method: 'post',
        data: { username: userData.username, password: userData.password },
        url: `${process.env?.REACT_APP_BASE_URL}/users/login`,
      })
      if (response.status === 200) {
        login(response.data)
        navigate(redirectPath, { replace: true })
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'something went wrong'
      setError(errorMessage)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) =>
                          setUserData((preData) => {
                            return { ...preData, username: e.target.value }
                          })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) =>
                          setUserData((preData) => {
                            return { ...preData, password: e.target.value }
                          })
                        }
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => clickHandler()}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right"></CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
