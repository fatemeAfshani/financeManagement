import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

type Data = {
  sidebarShow: boolean
  sidebarUnfoldable?: boolean
}

type MyContextProvider = {
  token: String | null
  data: Data
  changeData: (newData: Partial<Data>) => void
  login: ({ token }: { token: String }) => void
  logout: () => void
}

type MyContextProviderProps = {
  children: React.ReactNode
}

const myContext = React.createContext<MyContextProvider>({} as MyContextProvider)

export default function MyContextProvider({ children }: MyContextProviderProps) {
  let localStorageData = localStorage.getItem('tokenData')
  const now = new Date()
  let tokenData = null

  localStorageData = localStorageData && JSON.parse(localStorageData)
  if (localStorageData) {
    const { token, expire } = localStorageData as unknown as { token: string; expire: string }
    if (now > new Date(expire)) {
      localStorage.removeItem('tokenData')
    } else {
      tokenData = token
    }
  }
  const [token, setToken] = useState<String | null>(tokenData)
  const [data, setData] = useState<Data>({
    sidebarShow: true,
  })

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

  const changeData = (newData: Partial<Data>) => {
    setData((preData) => ({ ...preData, ...newData }))
  }

  return (
    <myContext.Provider value={{ token, login, logout, data, changeData }}>
      {children}
    </myContext.Provider>
  )
}

MyContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useMyContext = () => useContext(myContext)
