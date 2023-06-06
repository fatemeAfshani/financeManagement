import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'

type CustomerData = {
  name: string
  address: string
  phone: string
  postalCode: string
  trackingCode: string
}

type TableModalProps = {
  data: CustomerData
  id?: number
}

const CustomerDataModal = ({ data, id }: TableModalProps) => {
  const [visible, setVisible] = useState(false)
  console.log('### data', data)
  return (
    <>
      <CButton color="info" variant="outline" className="mx-3" onClick={() => setVisible(!visible)}>
        more
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Order {id} Customer Data:</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Name : {data.name}</p>
          <p>Address : {data.address}</p>
          <p>Phone : {data.phone}</p>
          <p>PostalCode : {data.postalCode}</p>
          <p>TrackingCode : {data.trackingCode}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default React.memo(CustomerDataModal)
