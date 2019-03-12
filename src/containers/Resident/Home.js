import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaMoneyCheckAlt, FaUserAlt } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { Link } from "react-router-dom";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;

  h2 {
    font-family: "Open Sans", sans-serif;
  }
  p {
    color: #999;
  }
`

const StyledLink = styled(Link)`
  color: #333333;
  text-decoration: none;

  :hover, :active {
    color: #136b4f;
    text-decoration: none;
  }

`

const StyledContainer = styled(Container)`
  text-align: center;

  .icon-container {
    margin: auto;
    cursor: pointer;
    
    p {
      font-size: 1.5em;
      font-weight: bold;
    }
    
    div {
      margin-bottom: 20px;
    }

    .icon {
      font-size: 7em;
    }

    hr {
      margin: 0;
      padding: 0;
    }
  }
  
  
`

export class ResidentHome extends Component {
  renderLander() {
    return (
      <StyledContainer>
        <FlexContainer>
          <div>
            <h2>SAVOY Apartment Management Portal</h2>
            <p>Welcome, you can pay your rent, request maintanance work, and update your info.</p>
          </div>
        </FlexContainer>
        <div>
          <LinkContainer to='/login'>
            <Button variant="outline-secondary" size="lg">LOG IN</Button>
          </LinkContainer>
        </div>
      </StyledContainer>
    )
  }

  renderResident() {
    return (
      <StyledContainer>
        <FlexContainer>
          <div>
            <h2>Welcome Resident</h2>
            <p>Welcome, you can pay your rent, request maintanance work, and update your info.</p>
          </div>
        </FlexContainer>
        <Row className="icon-container">
          <Col>
            <div>
              <StyledLink to='/payment'>
                <FaMoneyCheckAlt className="icon" />
                <hr />
                <p>Payment</p>
              </StyledLink>
            </div>
          </Col>
          <Col>
            <div>
              <StyledLink to='/maintanance'>
                <GiAutoRepair className="icon" />
                <hr />
                <p>Maintanance</p>
              </StyledLink>
            </div>
          </Col>
          <Col>
            <div>
              <StyledLink to='/resident'>
                <FaUserAlt className="icon" />
                <hr />
                <p>User Info</p>
              </StyledLink>
            </div>
          </Col>
        </Row>
      </StyledContainer>
    )
  }

  render() {
    return (
      this.props.isAuthenticated
        ? this.renderResident()
        : this.renderLander()
    )
  }
}

export default ResidentHome
