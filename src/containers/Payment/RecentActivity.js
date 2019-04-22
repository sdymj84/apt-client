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
`

const RecentActivity = () => {
  const recentActivity = {
    rows: [{
      paymentAccount: 'Bank Account',
      startDate: '05/01/2019',
      endDate: '04/01/2020',
      payOnDay: '2nd',
    }],
    columns: [{
      accessor: 'date',
      label: 'Date',
      position: 1,
      minWidth: 200,
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
