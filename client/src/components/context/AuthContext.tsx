import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

type AuthContextProvider = {
  token: String | null
  login: ({ token }: { token: String }) => void
  logout: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

const authContext = React.createContext<AuthContextProvider>({} as AuthContextProvider)

export default function AuthProvider({ children }: AuthProviderProps) {
  let localStorageData = localStorage.getItem('tokenData')
  let tokenData = null

  localStorageData = localStorageData && JSON.parse(localStorageData)
  if (localStorageData) {
    const { token, expire } = localStorageData as unknown as { token: string; expire: string }
    if (new Date() > new Date(expire)) {
      localStorage.removeItem('tokenData')
    } else {
      tokenData = token
    }
  }
  const [token, setToken] = useState<String | null>(tokenData)

  const login = ({ token }: { token: String }) => {
    const now = new Date()
    const item = {
      token: token,
      expire: now.getTime() + 6 * 3600 * 1000,
    }
    localStorage.setItem('tokenData', JSON.stringify(item))
    setToken(token)
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
