import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
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
  .charge {
    width: 500px;
  }
`

const MakePayment = () => {
  const balanceDetail = {
    rows: [{
      charge: 'Rent',
      amount: '$925.00',
      chargedOn: '04/01/2019'
    }, {
      charge: 'Water',
      amount: '$34.00',
      chargedOn: '04/01/2019'
    }, {
      charge: 'Internet',
      amount: '$60.00',
      chargedOn: '04/01/2019'
    }],
    columns: [{
      accessor: 'charge',
      label: 'Charge',
      position: 1,
      minWidth: 300,
    }, {
      accessor: 'amount',
      label: 'Amount',
      position: 2,
      minWidth: 150,
    }, {
      accessor: 'chargedOn',
      label: 'Charged on',
      position: 3,
      minWidth: 150,
    }]
  }

  const monthDetail = {
    rows: [{
      charge: 'Rent',
      amount: '$925.00',
    }, {
      charge: 'Water',
      amount: '$34.00',
    }, {
      charge: 'Internet',
      amount: '$60.00',
    }, {
      charge: 'Late rent fee',
      amount: '$50.00',
    }],
    columns: [{
      accessor: 'charge',
      label: 'Charge',
      position: 1,
      minWidth: 300,
    }, {
      accessor: 'amount',
      label: 'Amount',
      position: 2,
      minWidth: 150,
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        <div>Current Balance : $0.00</div>
        <div>As of : 4/19/2019</div>
      </div>
      <CollapsingTable
        rows={balanceDetail.rows}
        columns={balanceDetail.columns}
      />
      <LoaderButton
        block
        variant="outline-success"
        text="Pay Now" />

      <div className="title">
        <div>April Montly Charges</div>
      </div>
      <CollapsingTable
        rows={monthDetail.rows}
        columns={monthDetail.columns}
      />
    </StyledContainer>
  )
}

export default MakePayment
