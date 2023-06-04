import PropTypes from 'prop-types'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useMyContext } from './Context'

type RequireAuthProps = {
  children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { token } = useMyContext()
  const location = useLocation()

  if (!token) return <Navigate to="/login" state={{ path: location.pathname }} />
  return <>{children}</>
}

RequireAuth.propTypes = {
  children: PropTypes.node,
}
