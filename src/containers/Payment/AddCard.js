import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col, Alert, OverlayTrigger, Popover } from 'react-bootstrap'
import styled from 'styled-components'
import LoaderButton from '../../components/LoaderButton';
import { API } from 'aws-amplify'
import creditCardType from 'credit-card-type'
import { FiAlertCircle } from 'react-icons/fi'


const StyledModal = styled(Modal)`
  margin: 1em;
  .modal-footer {
    padding: 0.5em 1em;
  }
  .dropdown-toggle {
    width: 100%;
  }

  .mmyy {
    display: flex;
  }
  .slash {
    margin: auto;
    position: relative;
    top: 7px;
    font-size: 2em;
  }

 .alert-tooltip {
    color: green;
    cursor: pointer;
    margin: 0 5px;
    position: relative;
    top: 3px;
  }
`

export class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      number: "",
      month: "",
      year: "",
      cardType: "",
      cvc: "",
      isAlert: false,
      alertMessage: "",
      isLoading: false,
    }
  }

  validateNumber = (e) => {
    return e.target.value.match(/^[0-9]+$|^$/)
  }

  handleModalClose = () => {
    this.setState({
      name: "",
      number: "",
      month: "",
      year: "",
      cardType: "",
      cvc: "",
      isAlert: false,
      alertMessage: "",
      isLoading: false,
    })
    this.props.handleModalClose()
  }

  handleChange = (e) => {
    const id = e.target.id
    let cardType = this.state.cardType

    if (id === "number") {
      const type = creditCardType(e.target.value)
      cardType = e.target.value
        ? type.length ? type[0].niceType : "Invalid"
        : ""
    }

    this.setState({
      [id]: e.target.value,
      isAlert: false,
      cardType,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    this.setState({ isLoading: true })

    try {
      const rid = this.props.resident.residentId
      const cardInfo = {
        name: this.state.name,
        number: this.state.number,
        month: this.state.month,
        year: this.state.year,
        cardType: this.state.cardType,
        cvc: this.state.cvc,
      }
      const prevCard = this.props.resident.card
      const card = !prevCard || prevCard.length === 0
        ? [cardInfo]
        : [...prevCard, cardInfo]

      await API.put('apt', `/residents/updateCard/${rid}`, {
        body: {
          card
        }
      })
      this.props.updateResident(rid)
      this.handleModalClose()
    } catch (e) {
      console.log(e, e.response)
    }
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <StyledModal
        show={this.props.modalShow}
        onHide={this.handleModalClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={this.handleChange}
                    value={this.state.name} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Form.Group controlId="cardType">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={this.state.cardType} />
                </Form.Group>
              </Col>
              <Col xs={8}>
                <Form.Group controlId="number">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => {
                      this.validateNumber(e)
                        && this.handleChange(e)
                    }}
                    value={this.state.number} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="mmyy">
                <Form.Group controlId="month">
                  <Form.Label>MM</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => {
                      this.validateNumber(e)
                        && this.handleChange(e)
                    }}
                    value={this.state.month} />
                </Form.Group>
                <span className="slash">/</span>
                <Form.Group controlId="year">
                  <Form.Label>YY</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => {
                      this.validateNumber(e)
                        && this.handleChange(e)
                    }}
                    value={this.state.year} />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="cvc">
                  <Form.Label>CVC
                    <OverlayTrigger trigger="hover" placement="right" overlay={(
                      <Popover id="popover-basic">
                        {`CVC is the number on the back of your card.`}
                      </Popover>
                    )}>
                      <FiAlertCircle className="alert-tooltip" />
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => {
                      this.validateNumber(e)
                        && this.handleChange(e)
                    }}
                    value={this.state.cvc} />
                </Form.Group>
              </Col>
            </Row>

            {this.state.isAlert &&
              <Alert variant="danger">{this.state.alertMessage}</Alert>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={this.handleModalClose}>Cancel</Button>
            <LoaderButton
              type="submit"
              variant="outline-success"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving..." />
          </Modal.Footer>
        </Form>
      </StyledModal>
    )
  }
}

export default AddCard
