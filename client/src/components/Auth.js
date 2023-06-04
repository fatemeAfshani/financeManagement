import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

// type User = {
//   username: string
// }

// type AuthContext = {
//   user: User | null
//   login: (username: string) => void
//   logout: () => void
// }

// type AuthProviderProps = {
//   children: React.ReactNode
// }

const authContext = React.createContext({})

export default function AuthProvider({ children }) {
  let localStorageToken = null
  const now = new Date()
  const tokenData = JSON.parse(localStorage.getItem('tokenData'))
  if (tokenData) {
    if (now > tokenData?.expire) {
      localStorage.removeItem('tokenData')
    } else {
      localStorageToken = tokenData?.token
    }
  }
  const [token, setToken] = useState(localStorageToken)

  const login = (userData) => {
    const now = new Date()
    const item = {
      token: userData.token,
      expire: now.getTime() + 6 * 3600 * 1000,
    }
    localStorage.setItem('tokenData', JSON.stringify(item))
    setToken(userData.token)
  }

  const logout = () => {
    localStorage.removeItem('tokenData')
    setToken(null)
  }

  return <authContext.Provider value={{ token, login, logout }}>{children}</authContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export const useAuth = () => useContext(authContext)
