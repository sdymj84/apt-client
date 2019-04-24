import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'


const StyledModal = styled(Modal)`
  margin: 1em;
`

const AddBankAccount = () => {
  return (
    <StyledModal>
      Hello Modal
    </StyledModal>
  )
}

export default AddBankAccount
