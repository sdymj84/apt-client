/*

* There are 4 tabs
  - Make Payments
  - Auto-pay Setup
  - Recent Activity
  - Payment Accounts

1. Mayke Payment
  - Balance at the top right
  - List of Charges for this balance
  - List of Charges for current month
  - Autopay info
  - Pay Now button

2. Auto-pay Setup
  - Add / Edit / Delete payment method
  - Payment Account, Start Date, End Date, Pay on Day

3. Recent Activity
  - List of transactions that's consist of Date, Title, Charge, Payment, Balance
  - records per page / search / pagination should be available

4. Payment Accounts
  - Bank Accounts and Cards info
  - Add / Edit / Delete available for bank and card

*/

import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Tabs, Tab } from 'react-bootstrap'
import MakePayment from './MakePayment'


const StyledContainer = styled(Container)`
  margin-top: 3em;
  max-width: 600px;
`

export class Dashboard extends Component {
  render() {
    return (
      <StyledContainer>
        <Tabs defaultActiveKey="makePayment">
          <Tab eventKey="makePayment" title="Make Payment">
            <MakePayment />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <div>2</div>
          </Tab>
          <Tab eventKey="contact" title="Contact">
            <div>3</div>
          </Tab>
        </Tabs>
      </StyledContainer>
    )
  }
}

export default Dashboard
