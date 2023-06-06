import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

type AuthContextProvider = {
  user: User | null
  login: (data: User) => void
  logout: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

type User = {
  token: string | null
  role: string | null
}

const authContext = React.createContext<AuthContextProvider>({} as AuthContextProvider)

export default function AuthProvider({ children }: AuthProviderProps) {
  let localStorageData = localStorage.getItem('userData')
  let tokenData = null
  let storageRole = null

  localStorageData = localStorageData && JSON.parse(localStorageData)
  if (localStorageData) {
    const { token, expire, role } = localStorageData as unknown as {
      token: string
      expire: string
      role: string
    }
    if (new Date() > new Date(expire)) {
      localStorage.removeItem('userData')
    } else {
      tokenData = token
      storageRole = role
    }
  }
  const [user, setUser] = useState<User | null>({
    token: tokenData,
    role: storageRole,
  })

  const login = ({ token, role }: User) => {
    const now = new Date()
    const item = {
      token,
      expire: now.getTime() + 6 * 3600 * 1000,
      role,
    }
    localStorage.setItem('userData', JSON.stringify(item))
    setUser({ token, role })
  }

  const logout = () => {
    localStorage.removeItem('tokenData')
    setUser(null)
  }

  return <authContext.Provider value={{ user, login, logout }}>{children}</authContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export const useAuth = () => useContext(authContext)
