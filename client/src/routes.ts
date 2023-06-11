import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//me
const Profile = React.lazy(() => import('./views/me/Profile'))
const MyIncomes = React.lazy(() => import('./views/me/incomes'))

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
const OrderIncomes = React.lazy(() => import('./views/orders/OrderIncomes'))

// Users
const UserList = React.lazy(() => import('./views/users/UsersList'))
const UpdateUser = React.lazy(() => import('./views/users/Update'))
const UserIncomes = React.lazy(() => import('./views/users/UserIncomes'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/me/incomes', name: 'My Incomes', element: MyIncomes, exact: true },
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
  { path: '/orders/income/:id', name: 'Order income', element: OrderIncomes, exact: true },
  { path: '/users/list', name: 'Users list', element: UserList, exact: true },
  { path: '/users/update/:id', name: 'update user', element: UpdateUser, exact: true },
  { path: '/users/income/:id', name: 'user invome', element: UserIncomes, exact: true },
]

export default routes
