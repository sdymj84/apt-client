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

const PaymentAccounts = () => {
  const bankAccounts = {
    rows: [{
      name: 'Minjun Youn',
      routingNum: '081000032',
      accountNum: '*****5362',
      accountType: 'Checking',
      edit: 'Edit',
      delete: 'Delete',
    }],
    columns: [{
      accessor: 'name',
      label: 'Name on Account',
      position: 1,
      minWidth: 200,
    }, {
      accessor: 'routingNum',
      label: 'Routing No.',
      position: 2,
      minWidth: 200,
    }, {
      accessor: 'accountNum',
      label: 'Account No.',
      position: 3,
      minWidth: 200,
    }, {
      accessor: 'accountType',
      label: 'Account Type',
      position: 4,
      minWidth: 200,
    }, {
      accessor: 'edit',
      label: 'Edit',
      position: 5,
      minWidth: 3000,
    }, {
      accessor: 'delete',
      label: 'Delete',
      position: 6,
      minWidth: 3000,
    }]
  }

  const cards = {
    rows: [{
      cardType: 'Visa (Credit Card)',
      cardNum: 'XXXX-1209',
      edit: 'Edit',
      delete: 'Delete',
    }],
    columns: [{
      accessor: 'cardType',
      label: 'Card Type',
      position: 1,
      minWidth: 200,
    }, {
      accessor: 'cardNum',
      label: 'Card Number',
      position: 2,
      minWidth: 100,
    }, {
      accessor: 'edit',
      label: 'Edit',
      position: 5,
      minWidth: 3000,
    }, {
      accessor: 'delete',
      label: 'Delete',
      position: 6,
      minWidth: 3000,
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        Bank Accounts
        <Button variant="outline-success">Add Bank Account</Button>
      </div>
      <p>Use the bank accounts listed below to make one-time payments
        or schedule monthly automatic payments.</p>
      <CollapsingTable
        rows={bankAccounts.rows}
        columns={bankAccounts.columns}
      />
      <div className="title">
        <div>Credit Cards or Debit Cards</div>
        <div>
          <Button variant="outline-success">Add Credit Card</Button>
          <Button variant="outline-success">Add Debig Card  </Button>
        </div>
      </div>
      <p>Use the credit cards or debit cards listed below to make
          one-time payments or schedule monthly automatic payments.</p>
      <CollapsingTable
        rows={cards.rows}
        columns={cards.columns}
      />
    </StyledContainer>
  )
}

export default PaymentAccounts
