import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
import creditCardType from 'credit-card-type'
import AddBankAccount from './AddBankAccount';
import AddCard from './AddCard'

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
  state = {
    modalBankShow: false,
    modalCardShow: false,
  }

  handleBankModalShow = () => {
    this.setState({ modalBankShow: true })
  }
  handleBankModalClose = () => {
    this.setState({ modalBankShow: false })
  }

  handleCardModalShow = () => {
    this.setState({ modalCardShow: true })
  }
  handleCardModalClose = () => {
    this.setState({ modalCardShow: false })
  }


  render() {
    const { resident } = this.props

    const accounts = resident.bankAccount
    const cards = resident.card
    const bankRows = []
    const cardRows = []

    accounts && accounts.length && accounts.forEach(account => {
      bankRows.push({
        ...account,
        accountNum: `*****${account.accountNum.slice(-4)}`,
        edit: 'Edit',
        delete: 'Delete'
      })
    })

    cards && cards.length && cards.forEach(card => {
      cardRows.push({
        cardType: creditCardType(card.number)[0].niceType,
        cardNum: `XXXX-${card.number.slice(-4)}`,
        edit: 'Edit',
        delete: 'Delete',
      })
    })

    const bankAccountsTable = {
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

    const cardsTable = {
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

    return (
      <StyledContainer>
        <div className="title">
          Bank Accounts
        <Button
            variant="outline-success"
            onClick={this.handleBankModalShow}>
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
            <Button
              variant="outline-success"
              onClick={this.handleCardModalShow}>
              Add Credit Card</Button>
            <Button
              variant="outline-success"
              onClick={this.handleCardModalShow}>
              Add Debit Card</Button>
          </div>
        </div>
        <p>Use the credit cards or debit cards listed below to make
          one-time payments or schedule monthly automatic payments.</p>
        <CollapsingTable
          rows={cardsTable.rows}
          columns={cardsTable.columns}
        />

        <AddBankAccount
          modalShow={this.state.modalBankShow}
          handleModalClose={this.handleBankModalClose}
          updateResident={this.props.updateResident}
          resident={resident} />
        <AddCard
          modalShow={this.state.modalCardShow}
          handleModalClose={this.handleCardModalClose}
          updateResident={this.props.updateResident}
          resident={resident} />
      </StyledContainer>
    )
  }
}

export default PaymentAccounts
