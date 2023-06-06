import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/colors/Colors'))

// Products

const Products = React.lazy(() => import('./views/products/ProductsList'))
const ProductStocks = React.lazy(() => import('./views/products/ProductStocks'))
const Stocks = React.lazy(() => import('./views/products/Stocks'))

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products/list', name: 'Products', element: Products, exact: true },
  { path: '/product/stock/:id', name: 'Product stock', element: ProductStocks, exact: true },
  { path: '/products/stock', name: 'Stocks', element: Stocks, exact: true },
  // { path: '/colors', name: 'Colors', element: Colors },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
]

export default routes
