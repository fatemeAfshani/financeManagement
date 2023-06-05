import PropTypes from 'prop-types'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

type RequireAuthProps = {
  children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) return <Navigate to="/login" state={{ path: location.pathname }} />
  return <>{children}</>
}

RequireAuth.propTypes = {
  children: PropTypes.node,
}
