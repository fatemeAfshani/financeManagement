import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/colors/Colors'))

// Products

const Products = React.lazy(() => import('./views/products/ProductsList'))
const ProductStocks = React.lazy(() => import('./views/products/ProductStocks'))
const Stocks = React.lazy(() => import('./views/products/Stocks'))

// Invoices
const Invoices = React.lazy(() => import('./views/invoices/InvoicesList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products/list', name: 'Products', element: Products, exact: true },
  { path: '/product/stock/:id', name: 'Product stock', element: ProductStocks, exact: true },
  { path: '/products/stock', name: 'Stocks', element: Stocks, exact: true },
  { path: '/invoices/list', name: 'Invoices', element: Invoices, exact: true },
]

export default routes
