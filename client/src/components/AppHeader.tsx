import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import financeLogo from './../assets/brand/logoF2.png'
import { useData } from './context/DataContext'

const AppHeader = () => {
  const { data, changeData } = useData()

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => changeData({ sidebarShow: !data.sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {/* <NavLink to="/"> */}
        <CHeaderBrand className="mx-auto d-md-none">
          <img src={financeLogo} alt="finance management" width="200" height="100"></img>
        </CHeaderBrand>
        {/* </NavLink> */}
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CDropdown>
                <CDropdownToggle color="white">
                  {' '}
                  <CIcon icon={cilLanguage} size="lg" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => clickHander('en')}>
                    <CIcon icon={cifUs} size="lg" className="mx-3" />
                    <span>en</span>
                  </CDropdownItem>
                  <CDropdownItem onClick={() => clickHander('fa')}>
                    <CIcon icon={cifIr} size="lg" className="mx-3" />
                    <span>fa</span>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className=" mx-s-auto ms-md-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
