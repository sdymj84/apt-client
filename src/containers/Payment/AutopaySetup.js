import React from 'react'
import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';

const StyledContainer = styled(Container)`
  padding: 0;
  .title {
    margin: 2em 0 1em 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 1.5em;
  }
  button {
    margin-right: 5px;
  }
`

const AutopaySetup = () => {
  const autopayAccount = {
    rows: [{
      paymentAccount: 'Bank Account',
      startDate: '05/01/2019',
      endDate: '04/01/2020',
      payOnDay: '2nd',
    }],
    columns: [{
      accessor: 'paymentAccount',
      label: 'Payment Account',
      position: 1,
      minWidth: 200,
    }, {
      accessor: 'startDate',
      label: 'Start Date',
      position: 2,
      minWidth: 200,
    }, {
      accessor: 'endDate',
      label: 'End Date',
      position: 3,
      minWidth: 200,
    }, {
      accessor: 'payOnDay',
      label: 'Pay on Day',
      position: 4,
      minWidth: 200,
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        <div>Auto-pay Setup</div>
        <div>
          <Button variant="outline-warning">Edit</Button>
          <Button variant="outline-danger">Delete</Button>
        </div>
      </div>
      <CollapsingTable
        rows={autopayAccount.rows}
        columns={autopayAccount.columns}
      />
    </StyledContainer>
  )
}

export default AutopaySetup
