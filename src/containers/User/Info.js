import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import moment from 'moment'

const StyledContainer = styled(Container)`
  margin-top: 30px;
  max-width: 700px;

  .list-group-item:first-child {
    border-top: 2px solid #005916;
  }
  .btn-container {
    text-align: right;
  }
  button {
    margin: 0 0 5px 5px;
  }
`

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  
`

export class ResidentUserInfo extends Component {

  formatPhoneNumber = phoneNumberString => {
    var cleaned = (phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  render() {
    const { apart, resident, theme } = this.props

    return (
      resident &&
      <StyledContainer>
        <div className="btn-container">
          <Link to='/resident/edit-profile'>
            <Button variant={`outline-${theme.buttonTheme}`}>
              Edit Profile
            </Button>
          </Link>
          <Link to='/resident/change-password'>
            <Button variant={`outline-${theme.buttonTheme}`}>
              Change Password
            </Button>
          </Link>
        </div>
        <StyledCard border="success">
          <Card.Body>
            <Card.Title>
              <h1>{resident.firstName} {resident.lastName}</h1>
              <h3>Unit #{resident.apartId}</h3>
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col sm={4}>Address</Col>
                  <Col sm={8}>{apart.address.street}, Apt {apart.address.apt},
                  {} {apart.address.city}, {apart.address.state}
                    {} {apart.address.zipcode}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Email</Col>
                  <Col>{resident.email}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phone</Col>
                  <Col>{this.formatPhoneNumber(resident.phone)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Co-Residents</Col>
                  <Col>
                    {apart.residents.map((coResident, i) =>
                      (coResident.name !== resident.firstName + ' ' + resident.lastName)
                      && <div key={i}>{coResident.name}</div>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border={theme.buttonTheme}>
          <Card.Body>
            <Card.Title>Lease Information</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Move In Date</Col>
                  <Col>{moment(apart.moveInDate).format('L')}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Lease From Date</Col>
                  <Col>{moment(apart.leaseStartDate).format('L')}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Lease To Date</Col>
                  <Col>{moment(apart.leaseEndDate).format('L')}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border={theme.buttonTheme}>
          <Card.Body>
            <Card.Title>Vehicle Information</Card.Title>
            {resident.vehicles.map((vehicle, i) =>
              <ListGroup variant="flush" key={i}>
                <ListGroup.Item>
                  <Row>
                    <Col>My Car</Col>
                    <Col>{vehicle.year} {vehicle.make} {vehicle.model}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>License Plate</Col>
                    <Col>{vehicle.licensePlate}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>State</Col>
                    <Col>{vehicle.state}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Color</Col>
                    <Col>{vehicle.color}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Card.Body>
        </StyledCard>
        <StyledCard border={theme.buttonTheme}>
          <Card.Body>
            <Card.Title>User Settings</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Subscribe to Email Notifications</Col>
                  <Col>{resident.notifications.isEmailSub ? "Yes" : "No"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Subscribe to Voice Calls</Col>
                  <Col>{resident.notifications.isVoiceCallSub ? "Yes" : "No"}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Mobile Phone Number for Texts</Col>
                  <Col>{this.formatPhoneNumber(resident.phone)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Allow Text (SMS) Notifications</Col>
                  <Col>{resident.notifications.isTextSub ? "Yes" : "No"}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
    )
  }
}

export default ResidentUserInfo
