import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

type Data = {
  sidebarShow: boolean
  sidebarUnfoldable?: boolean
}

type dataContextProvider = {
  data: Data
  changeData: (newData: Partial<Data>) => void
}

type DataProviderProps = {
  children: React.ReactNode
}

const dataContext = React.createContext<dataContextProvider>({} as dataContextProvider)

export default function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<Data>({
    sidebarShow: true,
  })

  const changeData = async (newData: Partial<Data>) => {
    setData((preData) => ({ ...preData, ...newData }))
  }

  return <dataContext.Provider value={{ data, changeData }}>{children}</dataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.node,
}

export const useData = () => useContext(dataContext)
