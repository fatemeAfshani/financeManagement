import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilBuilding,
  cilDescription,
  cilNewspaper,
  cilSpeedometer,
  cilStorage,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const userNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/products/list',
      },
      {
        component: CNavItem,
        name: 'Stocks',
        to: '/products/stock',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/products/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Invoices',
    to: '/invoices',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/invoices/list',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/invoices/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/orders/list',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/orders/add',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavItem,
    name: 'SourceCode',
    href: 'https://github.com/fatemeAfshani/financeManagement',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/products/list',
      },
      {
        component: CNavItem,
        name: 'Stocks',
        to: '/products/stock',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/products/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Invoices',
    to: '/invoices',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/invoices/list',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/invoices/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/orders/list',
      },
      {
        component: CNavItem,
        name: 'Add',
        to: '/orders/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/users/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Company',
    to: '/company',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Incomes',
        to: '/company/incomes',
      },
      {
        component: CNavItem,
        name: 'Checkouts',
        to: '/comopany/checkouts',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavItem,
    name: 'SourceCode',
    href: 'https://github.com/fatemeAfshani/financeManagement',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]
