import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/colors/Colors'))

// Products

const Products = React.lazy(() => import('./views/products/ProductsList'))
const ProductStocks = React.lazy(() => import('./views/products/ProductStocks'))
const ProductInvoices = React.lazy(() => import('./views/products/Invoices'))
const ProductOrders = React.lazy(() => import('./views/products/Orders'))
const Stocks = React.lazy(() => import('./views/products/Stocks'))
const UpdateProduct = React.lazy(() => import('./views/products/Update'))
const AddProduct = React.lazy(() => import('./views/products/Add'))

// Invoices
const Invoices = React.lazy(() => import('./views/invoices/InvoicesList'))
const AddInvoice = React.lazy(() => import('./views/invoices/Add'))

// Orders
const Orders = React.lazy(() => import('./views/orders/OrdersList'))
const AddOrders = React.lazy(() => import('./views/orders/Add'))

// Users
const UserList = React.lazy(() => import('./views/users/usersList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products/list', name: 'Products', element: Products, exact: true },
  { path: '/product/stock/:id', name: 'Product stock', element: ProductStocks, exact: true },
  {
    path: '/product/invoices/:id',
    name: 'Product invoices',
    element: ProductInvoices,
    exact: true,
  },
  {
    path: '/product/orders/:id',
    name: 'Product orders',
    element: ProductOrders,
    exact: true,
  },
  {
    path: '/product/update/:id',
    name: 'update Product',
    element: UpdateProduct,
    exact: true,
  },
  { path: '/products/stock', name: 'Stocks', element: Stocks, exact: true },
  { path: '/products/add', name: 'add Product', element: AddProduct, exact: true },
  { path: '/invoices/list', name: 'Invoices', element: Invoices, exact: true },
  { path: '/invoices/add', name: 'add Invoice', element: AddInvoice, exact: true },
  { path: '/orders/list', name: 'Orders', element: Orders, exact: true },
  { path: '/orders/add', name: 'add Order', element: AddOrders, exact: true },
  { path: '/users/list', name: 'Users list', element: UserList, exact: true },
]

export default routes
