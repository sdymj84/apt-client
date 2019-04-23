import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
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
  .react-collapsible-theme .react-collapsible td, .react-collapsible-theme .react-collapsible thead th {
    min-width: 0;
  }
`

const RecentActivity = () => {
  const recentActivity = {
    rows: [{
      date: '3/3/2019',
      paymentAndCharges: 'rent-March',
      charges: '$926.00',
      payments: '$0.00',
      balance: '-$26.03'
    }, {
      date: '3/4/2019',
      paymentAndCharges: 'water-water service',
      charges: '$52.00',
      payments: '$0.00',
      balance: '-$78.03'
    }, {
      date: '3/5/2019',
      paymentAndCharges: 'Payment',
      charges: '$0.00',
      payments: '$78.03',
      balance: '$0.00'
    }],
    columns: [{
      accessor: 'date',
      label: 'Date',
      position: 1,
      minWidth: 100,
    }, {
      accessor: 'paymentAndCharges',
      label: 'Payments and Charges',
      position: 2,
      minWidth: 200,
    }, {
      accessor: 'charges',
      label: 'Charges',
      position: 3,
      minWidth: 200,
    }, {
      accessor: 'payments',
      label: 'Payments',
      position: 4,
      minWidth: 200,
    }, {
      accessor: 'balance',
      label: 'Balance',
      position: 5,
      minWidth: 200,
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        <div>Recent Activity</div>
      </div>
      <CollapsingTable
        showSearch={true}
        showPagination={true}
        rows={recentActivity.rows}
        columns={recentActivity.columns}
      />
    </StyledContainer>
  )
}

export default RecentActivity
