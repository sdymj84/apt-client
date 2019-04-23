import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import CollapsingTable from '../../components/CollapsingTable';
import LoaderButton from '../../components/LoaderButton';
import moment from 'moment'

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
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const balanceDetail = {
    rows: [{
      charge: 'Rent',
      amount: formatter.format(Number(926)),
      chargedOn: '04/01/2019'
    }, {
      charge: 'Water',
      amount: formatter.format(Number(34)),
      chargedOn: '04/01/2019'
    }, {
      charge: 'Internet',
      amount: formatter.format(Number(29.95 * 2)),
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
      id: 1,
      charge: 'Rent',
      amount: '$926.00',
    }, {
      id: 2,
      charge: 'Water/Sewer Utilities',
      amount: '$50.00',
    }, {
      id: 3,
      charge: 'Internet',
      amount: '$29.95.00',
    }, {
      id: 4,
      charge: 'Cable TV Fees',
      amount: '$29.95',
    }, {
      id: 5,
      charge: 'Trash Fees',
      amount: '$14.00',
    }, {
      id: 6,
      charge: 'Insurance Noncompilance Fee',
      amount: '$0.00',
    }, {
      id: 7,
      charge: 'Total Amount',
      amount: '$1,049.90',
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
        <div>{moment().format('MMMM')} Montly Charges</div>
      </div>
      <CollapsingTable
        rows={monthDetail.rows}
        columns={monthDetail.columns}
      />
    </StyledContainer>
  )
}

export default MakePayment
