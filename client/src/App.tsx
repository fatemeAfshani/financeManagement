import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider, DataProvider, RequireAuth } from './components'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={
                  <RequireAuth>
                    <DefaultLayout />{' '}
                  </RequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
