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

const MakePayment = ({ payments }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  let paymentsOnThisMonth = []
  let monthRows = []
  const d = new Date()
  let total = 0

  // Get index of payment which balance was 0 for the last
  const lastIndexOfZeroBalance = payments.findIndex(payment =>
    Number(payment.balance) === 0)

  let balanceRows = []
  for (let i = 0; i < lastIndexOfZeroBalance; i++) {
    balanceRows.push({
      charge: payments[i].title,
      amount: formatter.format(payments[i].charge),
      chargedOn: moment(Date(payments[i].transactedAt)).format('L'),
    })
  }

  const balanceDetail = {
    rows: balanceRows,
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
      sortable: false,
    }, {
      accessor: 'chargedOn',
      label: 'Charged on',
      position: 3,
      minWidth: 150,
    }]
  }




  // Filter payments by this month
  paymentsOnThisMonth = payments.filter(payment =>
    payment.transactedAt >= new Date(d.getFullYear(), d.getMonth(), 1))

  // Show main charges for this month
  // (rent, water, internet, cable, trash, insurance)
  paymentsOnThisMonth.forEach(payment => {
    const pre = payment.title.split('-')[0]
    switch (pre) {
      case 'rent':
        monthRows.push({
          charge: 'Rent',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      case 'water':
        monthRows.push({
          charge: 'Water/Sewer Utilities',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      case 'internet':
        monthRows.push({
          charge: 'Internet',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      case 'cable':
        monthRows.push({
          charge: 'Cable TV Fees',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      case 'trash':
        monthRows.push({
          charge: 'Trash Fees',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      case 'insurance':
        monthRows.push({
          charge: 'Insurance Noncomilance Fees',
          amount: formatter.format(payment.charge)
        })
        total = total + Number(payment.charge)
        break;
      default:
        break;
    }
  })

  // Add total at the end of table
  monthRows.push({
    charge: 'Total Amount',
    amount: formatter.format(total)
  })

  const monthDetail = {
    rows: monthRows,
    columns: [{
      accessor: 'charge',
      label: 'Charge',
      position: 1,
      minWidth: 300,
      sortable: false,
    }, {
      accessor: 'amount',
      label: 'Amount',
      position: 2,
      minWidth: 150,
      sortable: false,
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        <div>Current Balance : {formatter.format(payments[0].balance)}</div>
        <div>As of : {moment().format('L')}</div>
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
