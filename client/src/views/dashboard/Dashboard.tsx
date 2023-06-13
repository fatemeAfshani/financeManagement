import React, { useEffect, useState } from 'react'

import {
  CAlert,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CWidgetStatsC,
  CWidgetStatsF,
} from '@coreui/react'
import {
  cilPeople,
  cilBasket,
  cilUser,
  cilNewspaper,
  cilStorage,
  cilDollar,
  cilMoney,
  cilLibraryBuilding,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

import CIcon from '@coreui/icons-react'
import { useAuth } from '../../components/context/AuthContext'
import axios from 'axios'
import { convertDate } from '../../utils'

type OrderData = {
  date: string
  count: string
}

type IncomeData = {
  date: string
  sum: string
}

type Period = 'thisweek' | 'lastmonth' | 'last3month'

const Dashboard = () => {
  const [error, setError] = useState({
    totalError: '',
    companyError: '',
    userError: '',
    orderError: '',
    incomesError: '',
  })
  const [data, setData] = useState({
    total: {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalInvoices: 0,
    },
    company: {
      totalIncome: 0,
      totalIncomeNotSettled: 0,
      companyTotalIncome: 0,
      companyTotalIncomeNotSettled: 0,
    },
    user: {
      totalIncome: 0,
      totalIncomeNotSettled: 0,
    },
  })

  const [orders, setOrders] = useState<{ period: Period; data: OrderData[] }>({
    period: 'thisweek',
    data: [],
  })

  const [incomes, setIncomes] = useState<{ period: Period; data: IncomeData[] }>({
    period: 'thisweek',
    data: [],
  })
  const { user, logout } = useAuth()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/chart/user`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setData((pre) => {
          return { ...pre, user: response.data }
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        setError((pre) => {
          return { ...pre, userError: errorMessage }
        })
      }
    }
    const getTotalData = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/chart/total`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setData((pre) => {
          return { ...pre, total: response.data }
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        setError((pre) => {
          return { ...pre, totalError: errorMessage }
        })
      }
    }
    const getCompanyData = async () => {
      try {
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/chart/company`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setData((pre) => {
          return { ...pre, company: response.data }
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        setError((pre) => {
          return { ...pre, companyError: errorMessage }
        })
      }
    }

    getUserData()
    getCompanyData()
    getTotalData()
  }, [user, logout])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const period = orders.period || 'thisweek'
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/chart/orders?period=${period}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        setOrders((pre) => {
          return { ...pre, data: response.data }
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        setError((pre) => {
          return { ...pre, ordersError: errorMessage }
        })
      }
    }

    getOrders()
  }, [user, logout, orders.period])

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const period = incomes.period || 'thisweek'
        const response = await axios({
          url: `${process.env?.REACT_APP_BASE_URL}/chart/income?period=${period}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        setIncomes((pre) => {
          return { ...pre, data: response.data }
        })
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout()
        }
        const errorMessage = error.response?.data?.error || 'something went wrong'
        setError((pre) => {
          return { ...pre, incomesError: errorMessage }
        })
      }
    }

    getIncomes()
  }, [user, logout, incomes.period])

  return (
    <>
      {error.companyError && (
        <CAlert color="danger" dismissible>
          <strong>{error.companyError}</strong>
        </CAlert>
      )}{' '}
      {error.userError && (
        <CAlert color="danger" dismissible>
          <strong>{error.userError}</strong>
        </CAlert>
      )}{' '}
      {error.totalError && (
        <CAlert color="danger" dismissible>
          <strong>{error.totalError}</strong>
        </CAlert>
      )}{' '}
      {error.orderError && (
        <CAlert color="danger" dismissible>
          <strong>{error.orderError}</strong>
        </CAlert>
      )}{' '}
      {error.incomesError && (
        <CAlert color="danger" dismissible>
          <strong>{error.incomesError}</strong>
        </CAlert>
      )}{' '}
      <CRow>
        <CRow>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilStorage} size="xl" />}
              title="Total Products"
              value={data.total.totalProducts}
              color="primary"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilUser} size="xl" />}
              title="Total Users"
              value={data.total.totalUsers}
              color="info"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilBasket} size="xl" />}
              title="Total Orders"
              value={data.total.totalOrders}
              color="warning"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsF
              className="mb-3"
              icon={<CIcon width={24} icon={cilNewspaper} size="xl" />}
              title="Total Invoices"
              value={data.total.totalInvoices}
              color="danger"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6}>
            <CWidgetStatsC
              color="primary"
              icon={<CIcon icon={cilDollar} height={36} />}
              value={`$${data.user.totalIncome}`}
              title="My Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6}>
            <CWidgetStatsC
              color="dark"
              icon={<CIcon icon={cilMoney} height={36} />}
              value={`$${data.user.totalIncomeNotSettled}`}
              title="My UnSettled Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Orders Count
                  </h4>
                  <div className="small text-medium-emphasis">
                    The number of orders placed per day
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    <CButton
                      onClick={() => {
                        setOrders((pre) => {
                          return { ...pre, period: 'last3month' }
                        })
                      }}
                      color="outline-secondary"
                      key={'last3month'}
                      className="mx-0"
                      active={orders.period === 'last3month'}
                    >
                      Last 3 Month
                    </CButton>

                    <CButton
                      onClick={() => {
                        setOrders((pre) => {
                          return { ...pre, period: 'lastmonth' }
                        })
                      }}
                      color="outline-secondary"
                      key={'lastmonth'}
                      className="mx-0"
                      active={orders.period === 'lastmonth'}
                    >
                      Las Month
                    </CButton>
                    <CButton
                      onClick={() => {
                        setOrders((pre) => {
                          return { ...pre, period: 'thisweek' }
                        })
                      }}
                      color="outline-secondary"
                      key={'thisweek'}
                      className="mx-0"
                      active={orders.period === 'thisweek'}
                    >
                      This Week
                    </CButton>
                  </CButtonGroup>
                </CCol>
              </CRow>

              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: orders.data.map((order) => convertDate(order.date)),
                  datasets: [
                    {
                      label: 'Total Count',
                      backgroundColor: hexToRgba(getStyle('--cui-info')!, 10),
                      borderColor: '#803763',
                      pointHoverBackgroundColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: orders.data.map((order) => +order.count),
                      fill: true,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        maxTicksLimit: 5,
                        stepSize: 10,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CRow>
        <CRow>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="success"
              icon={<CIcon icon={cilPeople} height={36} />}
              value={`$${data.company.totalIncome}`}
              title="Company Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="info"
              icon={<CIcon icon={cilPeople} height={36} />}
              value={`$${data.company.totalIncomeNotSettled}`}
              title="Company UnSettled Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="warning"
              icon={<CIcon icon={cilLibraryBuilding} height={36} />}
              value={`$${data.company.companyTotalIncome}`}
              title="Company Share Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="danger"
              icon={<CIcon icon={cilLibraryBuilding} height={36} />}
              value={`$${data.company.companyTotalIncomeNotSettled}`}
              title="Company UnSettled Share Income"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Total Income
                  </h4>
                  <div className="small text-medium-emphasis">
                    The total profit of orders placed per day
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    <CButton
                      onClick={() => {
                        setIncomes((pre) => {
                          return { ...pre, period: 'last3month' }
                        })
                      }}
                      color="outline-secondary"
                      key={'last3month'}
                      className="mx-0"
                      active={incomes.period === 'last3month'}
                    >
                      Last 3 Month
                    </CButton>

                    <CButton
                      onClick={() => {
                        setIncomes((pre) => {
                          return { ...pre, period: 'lastmonth' }
                        })
                      }}
                      color="outline-secondary"
                      key={'lastmonth'}
                      className="mx-0"
                      active={incomes.period === 'lastmonth'}
                    >
                      Las Month
                    </CButton>
                    <CButton
                      onClick={() => {
                        setIncomes((pre) => {
                          return { ...pre, period: 'thisweek' }
                        })
                      }}
                      color="outline-secondary"
                      key={'thisweek'}
                      className="mx-0"
                      active={incomes.period === 'thisweek'}
                    >
                      This Week
                    </CButton>
                  </CButtonGroup>
                </CCol>
              </CRow>

              <CChartBar
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: incomes.data.map((income) => convertDate(income.date)),
                  datasets: [
                    {
                      label: 'Total Income',
                      backgroundColor: '#803763',
                      data: incomes.data.map((income) => +income.sum),
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        maxTicksLimit: 5,
                        stepSize: 10,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CRow>
      </CRow>
    </>
  )
}

export default Dashboard
