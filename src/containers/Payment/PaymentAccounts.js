import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
import creditCardType from 'credit-card-type'
import AddBankAccount from './AddBankAccount';
import AddCard from './AddCard'
import DeleteButton from '../../components/DeleteButton'
import { API } from 'aws-amplify'

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
  _isMounted = false
  state = {
    modalBankShow: false,
    modalCardShow: false,
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
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

  handleBankDelete = async (index) => {
    const rid = this.props.resident.residentId
    const prevBankAccount = this.props.resident.bankAccount
    const bankAccount = prevBankAccount.filter((account, i) =>
      i !== index)
    const { autopay } = this.props.resident
    const autopayAccountNum = autopay && autopay.autopayMethod
      && autopay.autopayMethod.accountNum

    console.log(autopay)

    try {
      await API.put('apt',
        `/residents/updateBankAccount/${rid}`, {
          body: { bankAccount }
        })
      console.log(prevBankAccount[index].accountNum, autopayAccountNum)
      if (prevBankAccount[index].accountNum === autopayAccountNum) {
        await this.deleteAutopay(rid)
      }
      this.props.updateResident(rid)
    } catch (e) {
      console.log(e, e.response)
    }
  }

  handleCardDelete = async (index) => {
    const rid = this.props.resident.residentId
    const prevCard = this.props.resident.card
    const card = prevCard.filter((card, i) =>
      i !== index)
    const { autopay } = this.props.resident
    const autopayCardNum = autopay && autopay.autopayMethod
      && autopay.autopayMethod.number

    try {
      await API.put('apt',
        `/residents/updateCard/${rid}`, {
          body: { card }
        })
      console.log(prevCard[index].number, autopayCardNum)
      if (prevCard[index].number === autopayCardNum) {
        await this.deleteAutopay(rid)
      }
      this.props.updateResident(rid)
    } catch (e) {
      console.log(e, e.response)
    }
  }

  deleteAutopay = async (rid) => {
    try {
      await API.put('apt', `/residents/updateAutopay/${rid}`, {
        body: { autopay: "" }
      })
    } catch (e) {
      console.log(e, e.response)
    }
  }

  render() {
    return (
      this.props.resident
        ? this.renderPage()
        : null
    )
  }

  renderPage() {
    const { resident } = this.props

    const accounts = resident.bankAccount
    const cards = resident.card
    const bankRows = []
    const cardRows = []

    accounts && accounts.length && accounts.forEach((account, i) => {
      bankRows.push({
        ...account,
        accountNum: `*****${account.accountNum.slice(-4)}`,
        index: i,
        delete: 'Delete'
      })
    })

    cards && cards.length && cards.forEach((card, i) => {
      cardRows.push({
        cardType: creditCardType(card.number)[0].niceType,
        cardNum: `XXXX-${card.number.slice(-4)}`,
        index: i,
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
        accessor: 'bankDelete',
        label: 'Delete',
        position: 6,
        minWidth: 3000,
        CustomComponent: DeleteButton,
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
        accessor: 'cardDelete',
        label: 'Delete',
        position: 6,
        minWidth: 3000,
        CustomComponent: DeleteButton,
      }]
    }

    const tableCallbacks = {
      bankDelete: this.handleBankDelete,
      cardDelete: this.handleCardDelete
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
          callbacks={tableCallbacks}
        />
        <div className="title">
          <div>Credit Cards or Debit Cards</div>
          <div>
            <Button
              variant="outline-success"
              onClick={this.handleCardModalShow}>
              Add Card</Button>
          </div>
        </div>
        <p>Use the credit cards or debit cards listed below to make
          one-time payments or schedule monthly automatic payments.</p>

        {this._isMounted &&
          <CollapsingTable
            rows={cardsTable.rows}
            columns={cardsTable.columns}
            callbacks={tableCallbacks}
          />}

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
