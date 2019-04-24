import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
import creditCardType from 'credit-card-type'

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


export class PaymentAccounts extends Component {

  accounts = resident.bankAccount
  cards = resident.card
  bankRows = []
  cardRows = []


  bankAccountsTable = {
    rows: bankRows,
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

  cardsTable = {
    rows: cardRows,
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

  render() {
    const { resident } = this.props
    accounts.forEach(account => {
      bankRows.push({
        ...account,
        accountNum: `*****${account.accountNum.slice(-4)}`,
        edit: 'Edit',
        delete: 'Delete'
      })
    })

    cards.forEach(card => {
      cardRows.push({
        cardType: creditCardType(card.number)[0].niceType,
        cardNum: `XXXX-${card.number.slice(-4)}`,
        edit: 'Edit',
        delete: 'Delete',
      })
    })

    return (
      <StyledContainer>
        <div className="title">
          Bank Accounts
        <Button
            variant="outline-success"
            onClick={this.modalBankShow}>
            Add Bank Account
        </Button>
        </div>
        <p>Use the bank accounts listed below to make one-time payments
        or schedule monthly automatic payments.</p>
        <CollapsingTable
          rows={bankAccountsTable.rows}
          columns={bankAccountsTable.columns}
        />
        <div className="title">
          <div>Credit Cards or Debit Cards</div>
          <div>
            <Button variant="outline-success">Add Credit Card</Button>
            <Button variant="outline-success">Add Debit Card  </Button>
          </div>
        </div>
        <p>Use the credit cards or debit cards listed below to make
          one-time payments or schedule monthly automatic payments.</p>
        <CollapsingTable
          rows={cardsTable.rows}
          columns={cardsTable.columns}
        />
      </StyledContainer>
    )
  }
}

export default PaymentAccounts
