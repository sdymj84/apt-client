import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import moment from 'moment'

const StyledContainer = styled(Container)`
  margin-top: 30px; 
  span {
    display: inline-block;
    
    :first-child {
      width: 100%;
      max-width: 300px;
    }
  }

  @media (max-width: 576px) {
    span {
      display: block;
    }
  }

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
    console.log(this.props.resident)
    const resident = this.props.resident

    return (
      resident &&
      <StyledContainer>
        <div className="btn-container">
          <Button variant={`outline-${this.props.theme.buttonTheme}`}>
            Edit Profile
          </Button>
          <Link to='/resident/change-password'>
            <Button variant={`outline-${this.props.theme.buttonTheme}`}>
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
                <span>Address</span>
                <span>5620 W 134TH PL, APT 1916, OVERLAND PARK, KS 66211</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Email</span>
                <span>{resident.email}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Phone</span>
                <span>{this.formatPhoneNumber(resident.phone)}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Co-Residents</span>
                <span>Jihee Chung</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border={this.props.theme.buttonTheme}>
          <Card.Body>
            <Card.Title>Lease Information</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>Move In Date</span>
                <span>{moment(resident.moveInDate).format('L')}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Lease From Date</span>
                <span>{moment(resident.leaseStartDate).format('L')}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Lease To Date</span>
                <span>{moment(resident.leaseEndDate).format('L')}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border={this.props.theme.buttonTheme}>
          <Card.Body>
            <Card.Title>Vehicle Information</Card.Title>
            {resident.vehicles.map((vehicle, i) =>
              <ListGroup variant="flush" key={i}>
                <ListGroup.Item>
                  <span>My Car</span>
                  <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>License Plate</span>
                  <span>{vehicle.licensePlate}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>State</span>
                  <span>{vehicle.state}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>Color</span>
                  <span>{vehicle.color}</span>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Card.Body>
        </StyledCard>
        <StyledCard border={this.props.theme.buttonTheme}>
          <Card.Body>
            <Card.Title>User Settings</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>Subscribe to Email Notifications</span>
                <span>{resident.notifications.isEmailSub ? "Yes" : "No"}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Subscribe to Voice Calls</span>
                <span>{resident.notifications.isVoiceCallSub ? "Yes" : "No"}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Mobile Phone Number for Texts</span>
                <span>{this.formatPhoneNumber(resident.phone)}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Allow Text (SMS) Notifications</span>
                <span>{resident.notifications.isTextSub ? "Yes" : "No"}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
    )
  }
}

export default ResidentUserInfo
