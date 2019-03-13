import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Card, Jumbotron, ListGroup } from "react-bootstrap";
import { API } from 'aws-amplify'

const StyledContainer = styled(Container)`
  margin-top: 30px;
`

const StyledJumbotron = styled(Jumbotron)`
  padding: 30px;
  p {
    margin: 4px 0;
  }
`

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  span {
    display: inline-block;
    width: 100%;
    max-width: 300px;
  }
`

export class ResidentUserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount = async () => {
    try {
      const resident = await API.get('apt', `/residents/${this.props.uid}`)
      console.log("Resident : ", resident)
    } catch (e) {
      console.log(e)
      console.log("Error response : ", e.response)
    }
  }


  render() {
    console.log(this.props)
    return (
      <StyledContainer>
        <StyledJumbotron>
          <h1>Minjun Youn</h1>
          <h3>Unit #1916</h3>
          <p>5620 W 134TH PL, APT 1916, OVERLAND PARK, KS 66211</p>
          <p>Email: sdymj84@gmail.com</p>
          <p>Phone : 913-353-6799</p>
          <p>Co-Residents: Jihee Chung</p>
        </StyledJumbotron>
        <StyledCard border="secondary">
          <Card.Body>
            <Card.Title>Lease Information</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>Move In Date</span>
                <span>9/24/2016</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Lease From Date</span>
                <span>9/24/2018</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Lease To Date</span>
                <span>3/23/2019</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border="secondary">
          <Card.Body>
            <Card.Title>Vehicle Information</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>My Car</span>
                <span>2011 Kia Soul</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>License Plate</span>
                <span>263KJL</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>State</span>
                <span>KS</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Color</span>
                <span>White</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
        <StyledCard border="secondary">
          <Card.Body>
            <Card.Title>User Settings</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>Subscribe to Email Notifications</span>
                <span>Yes</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Subscribe to Voice Calls</span>
                <span>Yes</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Mobile Phone Number for Texts</span>
                <span>(913) 353-6799</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Allow Text (SMS) Notifications</span>
                <span>Yes - Phone Number Confirmed</span>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </StyledCard>
      </StyledContainer>
    )
  }
}

export default ResidentUserInfo
