import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../components/context/AuthContext'
import axios from 'axios'

type RegisterInput = {
  username: string
  password: string
  code?: string
  companyName?: string
}

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    code: '',
    companyName: '',
  })
  const [registerData, setRegisterData] = useState({
    error: '',
    message: '',
  })

  const [passwordError, setPasswordError] = useState('')
  const [company, setCompany] = useState({
    text: 'Already have a company?',
    have: false,
  })

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const redirectPath = location.state?.path || '/login'
  if (user?.token) navigate(redirectPath)

  const clickHandler = async () => {
    try {
      const data: RegisterInput = { username: userData.username, password: userData.password }
      if (company.have) {
        data.code = userData.code
      } else {
        data.companyName = userData.companyName
      }
      let response = await axios({
        method: 'post',
        data,
        url: `${process.env?.REACT_APP_BASE_URL}/users/register`,
      })
      if (response.status === 200) {
        setRegisterData({ error: '', message: 'registered successfully, please login now' })
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'something went wrong'
      setRegisterData({ error: errorMessage, message: '' })
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Sign up</h1>
                  {registerData.error && (
                    <CAlert color="danger" dismissible>
                      <strong>{registerData.error}</strong>
                    </CAlert>
                  )}
                  {registerData.message && (
                    <CAlert color="success" dismissible>
                      <strong>{registerData.message}</strong>
                    </CAlert>
                  )}
                  <p className="text-medium-emphasis">Create your account</p>
                  <CFormInput
                    placeholder="Username"
                    autoComplete="username"
                    className="mb-2"
                    onChange={(e) =>
                      setUserData((preData) => {
                        return { ...preData, username: e.target.value }
                      })
                    }
                    label="Username"
                  />
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className="mb-2"
                    text="password must be atleast 6 character"
                    onChange={(e) =>
                      setUserData((preData) => {
                        return { ...preData, password: e.target.value }
                      })
                    }
                    label="Password"
                  />
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className="mb-2"
                    onChange={(e) => {
                      if (e.target.value !== userData.password) {
                        setPasswordError('password and repeat password are not same')
                      } else {
                        setPasswordError('')
                      }
                    }}
                    label="Reapeat Password"
                  />
                  <div className="form-check form-switch py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      onChange={() =>
                        setCompany((preState) => {
                          return {
                            have: !preState.have,
                            text: preState.have
                              ? ' Create new Company?'
                              : 'Already have a company?',
                          }
                        })
                      }
                    ></input>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                      {company.text}
                    </label>
                  </div>
                  {!company.have && (
                    <CFormInput
                      placeholder="CompanyName"
                      autoComplete="Company Name"
                      className="mb-2"
                      onChange={(e) =>
                        setUserData((preData) => {
                          return { ...preData, companyName: e.target.value }
                        })
                      }
                      label="Company Name"
                    />
                  )}
                  {company.have && (
                    <CFormInput
                      placeholder="CompanyCode"
                      autoComplete="Company Code"
                      className="mb-2"
                      onChange={(e) =>
                        setUserData((preData) => {
                          return { ...preData, code: e.target.value }
                        })
                      }
                      label="Company Code"
                    />
                  )}
                  <CCol xs={6} className="text-right">
                    <CButton color="warning" className="mb-2" onClick={() => navigate('/login')}>
                      Login{' '}
                    </CButton>
                  </CCol>
                  <div className="d-grid">
                    <CButton color="success" onClick={clickHandler}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
