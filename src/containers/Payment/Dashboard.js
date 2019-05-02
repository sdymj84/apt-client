/*

* Limitation of react-collapsing-table
  - can't set className on specific table or row/column
  - string currency cannot be sorted properly
*/

import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Tabs, Tab } from 'react-bootstrap'
import MakePayment from './MakePayment'
import PaymentAccounts from './PaymentAccounts';
import AutopaySetup from './AutopaySetup';
import RecentActivity from './RecentActivity';


const StyledContainer = styled(Container)`
  margin-top: 3em;
  max-width: 800px;
`

export class Dashboard extends Component {
  render() {
    return (
      <StyledContainer>
        <Tabs defaultActiveKey="makePayment"
          mountOnEnter>
          <Tab eventKey="makePayment" title="Make Payment">
            <MakePayment
              payments={this.props.payments}
              updatePayments={this.props.updatePayments} />
          </Tab>
          <Tab eventKey="autoPaySetup" title="Auto-pay Setup">
            <AutopaySetup
              resident={this.props.resident}
              updateResident={this.props.updateResident}
              updateApart={this.props.updateApart} />
          </Tab>
          <Tab eventKey="recentActivity" title="Recent Activity">
            <RecentActivity payments={this.props.payments} />
          </Tab>
          <Tab eventKey="paymentAccounts" title="Payment Accounts">
            <PaymentAccounts
              resident={this.props.resident}
              updateResident={this.props.updateResident} />
          </Tab>
        </Tabs>
      </StyledContainer>
    )
  }
}

export default Dashboard
