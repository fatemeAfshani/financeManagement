import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { OrderProduct } from '../../../types'

type TableModalProps = {
  data?: OrderProduct[]
  id?: number
}

const ProductsModal = ({ data, id }: TableModalProps) => {
  const [visible, setVisible] = useState(false)
  console.log('### data', data)
  return (
    <>
      <CButton
        color="primary"
        variant="outline"
        className="mx-3"
        onClick={() => setVisible(!visible)}
      >
        view detail
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Order {id} Products:</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable className=" table  bg-white table-striped" hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ProductId</CTableHeaderCell>
                <CTableHeaderCell scope="col">BuyPrice</CTableHeaderCell>
                <CTableHeaderCell scope="col">SellPrice</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data &&
                data.map((row) => {
                  return (
                    <>
                      <CTableRow key={row.id}>
                        <CTableDataCell>{row.productId}</CTableDataCell>
                        <CTableDataCell>{row.buyPrice}</CTableDataCell>
                        <CTableDataCell>{row.sellPrice}</CTableDataCell>
                        <CTableDataCell>{row.amount}</CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })}
            </CTableBody>
          </CTable>
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

export default React.memo(ProductsModal)
