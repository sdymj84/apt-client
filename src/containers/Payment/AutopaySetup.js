import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Dropdown } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
import AddAutopay from './AddAutopay'
import { API } from 'aws-amplify'
import moment from 'moment'
import LoaderButton from '../../components/LoaderButton';

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
  .paymentAccount {
    width: 250px;
  }
  .loader-btn-container {
    display: inline;
  }
`

export class AutopaySetup extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      modalShow: false,
      paymentMethodList: [],
      autopayMethod: "",
      autopayMethodText: 'Select Account',
      isLoading: false,
    }
  }

  /* {
    paymentAccount: 'Bank Account',
    startDate: '05/01/2019',
    endDate: '04/01/2020',
    payOnDay: '2nd',
  } */

  componentDidMount() {
    // conver accounts into simple text and save in array

    this._isMounted = true
    const { bankAccount, card } = this.props.resident
    const paymentMethodList = []
    let text = ""

    bankAccount && bankAccount.forEach(account => {
      const type = (account.accountType === 'Checking Account')
        ? 'Chk' : 'Sav'
      text = `${account.name} ${type} *****${account.accountNum.slice(-4)}`
      paymentMethodList.push(text)
    })
    card && card.forEach(card => {
      text = `${card.cardType} XXXX-${card.number.slice(-4)}`
      paymentMethodList.push(text)
    })

    this._isMounted && this.setState({
      paymentMethodList,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleModalClose = () => {
    this.setState({
      modalShow: false,
      autopayMethodText: 'Select Account',
    })
  }

  handleAccountSelect = (key, e) => {
    // save selected account object for future reference
    // save selected account text for dropdown title

    let { bankAccount, card } = this.props.resident
    bankAccount = bankAccount || []
    card = card || []
    const autopayMethod = (e.target.id < bankAccount.length)
      // if selected method is bank account,
      ? bankAccount[e.target.id]
      // if selected method is card
      : card[e.target.id - bankAccount.length]

    this.setState({
      autopayMethod,
      autopayMethodText: this.state.paymentMethodList[e.target.id],
      modalShow: true
    })
  }

  handleSubmit = async ({ startDate, endDate, payOnDay }, e) => {
    e.preventDefault()
    const rid = this.props.resident.residentId
    const aid = this.props.resident.apartId
    const autopay = {
      autopayMethod: this.state.autopayMethod,
      autopayMethodText: this.state.autopayMethodText,
      startDate, endDate, payOnDay,
    }
    this.setState({ isLoading: true })

    try {
      await API.put('apt', `/residents/updateAutopay/${rid}`, {
        body: { autopay }
      })
      await API.put('apt', `/aparts/updateAutopay/${aid}`, {
        body: {
          isAutopayEnabled: true,
          autopay: {
            startDate, endDate, payOnDay,
            residentId: rid,
          }
        }
      })
      this.props.updateResident(rid)
      this.props.updateApart(aid)
      this.handleModalClose()
    } catch (e) {
      console.log(e, e.response)
    }

    this.setState({ isLoading: false })
  }

  handleDelete = async () => {
    this.setState({ isLoading: true })
    const rid = this.props.resident.residentId
    const aid = this.props.resident.apartId
    try {
      await API.put('apt', `/residents/updateAutopay/${rid}`, {
        body: { autopay: "" }
      })
      await API.put('apt', `/aparts/updateAutopay/${aid}`, {
        body: {
          isAutopayEnabled: false,
          autopay: {
            startDate: "",
            endDate: "",
            payOnDay: "",
            residentId: "",
          }
        }
      })
      this.props.updateResident(rid)
      this.props.updateApart(aid)
    } catch (e) {
      console.log(e, e.response)
    }

    this.setState({
      isLoading: false,
      autopayMethodText: 'Select Account'
    })
  }

  setTable = () => {
    const { autopay } = this.props.resident
    const rows = autopay ? [{
      paymentAccount: autopay.autopayMethodText,
      startDate: moment(autopay.startDate).format('L'),
      endDate: moment(autopay.endDate).format('L'),
      payOnDay: autopay.payOnDay,
    }] : []

    return {
      rows,
      columns: [{
        accessor: 'paymentAccount',
        label: 'Payment Account',
        position: 1,
        minWidth: 200,
        sortable: false,
      }, {
        accessor: 'startDate',
        label: 'Start Date',
        position: 2,
        minWidth: 200,
        sortable: false,
      }, {
        accessor: 'endDate',
        label: 'End Date',
        position: 3,
        minWidth: 200,
        sortable: false,
      }, {
        accessor: 'payOnDay',
        label: 'Pay on Day',
        position: 4,
        minWidth: 200,
        sortable: false,
      }]
    }
  }

  render() {
    const autopayAccount = this.props.resident && this.setTable()

    return (
      <StyledContainer>
        <div className="title">
          <div>Auto-pay Setup</div>
          <div>
            <LoaderButton
              onClick={this.handleDelete}
              variant="outline-danger"
              isLoading={!this.state.modalShow && this.state.isLoading}
              text="Delete"
              loadingText="Deleting..." />
          </div>
        </div>
        {this._isMounted &&
          <CollapsingTable
            rows={autopayAccount.rows}
            columns={autopayAccount.columns}
          />}
        {(!this.props.resident.autopay || this.props.resident.autopay.length === 0)
          ? <Dropdown onSelect={this.handleAccountSelect}>
            <Dropdown.Toggle
              variant="outline-secondary">
              {this.state.autopayMethodText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.paymentMethodList.map((list, i) =>
                <Dropdown.Item eventKey='account' key={i} id={i}>
                  {list}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown> : null}

        <AddAutopay
          modalShow={this.state.modalShow}
          handleModalClose={this.handleModalClose}
          handleSubmit={this.handleSubmit}
          isLoading={this.state.isLoading} />
      </StyledContainer>
    )
  }
}

export default AutopaySetup
