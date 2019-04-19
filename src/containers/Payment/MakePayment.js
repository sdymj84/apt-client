import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const StyledContainer = styled(Container)`
  margin: 2em 0;
  padding: 0;

  .title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 1.5em;
  }
`

const MakePayment = () => {
  const balanceDetail = {
    data: [{
      charge: 'Rent',
      amount: '$900.00',
      chargedOn: '04/01/2019'
    }],
    columns: [{
      Header: 'Charge',
      accessor: 'charge', // String-based value accessors!
    }, {
      Header: 'Amount',
      accessor: 'amount',
      maxWidth: 110,
      style: {
        textAlign: 'right',
      },
    }, {
      Header: 'Charged on',
      accessor: 'chargedOn',
      maxWidth: 110,
      style: {
        textAlign: 'right',
      },
    }]
  }

  const monthDetail = {
    data: [{
      charge: 'Rent',
      amount: 900,
    }, {
      charge: 'Water',
      amount: 35,
    }, {
      charge: 'Internet',
      amount: 60,
    }],
    columns: [{
      Header: 'Charge',
      accessor: 'charge' // String-based value accessors!
    }, {
      Header: 'Amount',
      accessor: 'amount',
    }]
  }

  return (
    <StyledContainer>
      <div className="title">
        <div>Current Balance : $0.00</div>
        <div>As of : 4/19/2019</div>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>Annual Conference</Th>
            <Th>Year</Th>
            <Th>Location</Th>
            <Th>President</Th>
            <Th>Program Chair</Th>
            <Th>Conference Theme</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>31</Td>
            <Td>2017</Td>
            <Td>Alabama Community College System (ACCS)</Td>
            <Td>Mr. Toner Evans, Samford University</Td>
            <Td>Ms. Kelly Birchfield, Auburn University Montgomery</Td>
          </Tr>
          <Tr>
            <Td>30</Td>
            <Td>2016</Td>
            <Td>Samford University</Td>
            <Td>Ms. Angel Jowers, University of West Alabama</Td>
            <Td>Mr. Toner Evans, Samford University</Td>
            <Td>Academ(ia) Awards: Best Practices/Performances in IR</Td>
          </Tr>
          <Tr>
            <Td>29</Td>
            <Td>2015</Td>
            <Td>Eufaula (Wallace Community College Dothan)</Td>
            <Td>Dr. Annette Cederholm, Snead State Community College</Td>
            <Td>Ms. Angel Jowers, University of West Alabama</Td>
            <Td>Back to the Future</Td>
          </Tr>
          <Tr>
            <Td>28</Td>
            <Td>2014</Td>
            <Td>Huntsville (J.F. Drake State Community and Technical College)</Td>
            <Td>Dr. Jon C. Acker, The University of Alabama</Td>
            <Td>Dr. Annette Cederholm, Snead State Community College</Td>
            <Td>Institutional Research…and Beyond!</Td>
          </Tr>
          <Tr>
            <Td>27</Td>
            <Td>2013</Td>
            <Td>The University of Alabama</Td>
            <Td>Mr. John McIntosh, Northwest-Shoals Community College</Td>
            <Td>Dr. Jon C. Acker, The University of Alabama</Td>
            <Td>Moving the Ball Forward</Td>
          </Tr>
        </Tbody>
      </Table>
    </StyledContainer>
  )
}

export default MakePayment
