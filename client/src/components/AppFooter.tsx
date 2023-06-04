import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1"> finance management &copy; 2023 </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">created by </span>
        <a href="https://github.com/fatemeAfshani" target="_blank" rel="noopener noreferrer">
          fateme afshani
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
