import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import financeLogo from './../assets/brand/logoF.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { useData } from './context/DataContext'

const AppSidebar = () => {
  const { data, changeData } = useData()

  return (
    <CSidebar
      position="fixed"
      unfoldable={data.sidebarUnfoldable}
      visible={data.sidebarShow}
      onVisibleChange={(visible) => {
        changeData({ sidebarShow: visible })
      }}
    >
      {/* <NavLink to="/"> */}
      <CSidebarBrand className="d-none d-md-flex">
        <img src={financeLogo} alt="finance management" width="200" height="100" />
      </CSidebarBrand>
      {/* </NavLink> */}
      {/* <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={financeLogo} alt="finance management" width="200" height="100"></img>
      </CSidebarBrand> */}
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => changeData({ sidebarUnfoldable: !data.sidebarUnfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
