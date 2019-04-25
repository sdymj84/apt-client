import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import LoaderButton from '../../components/LoaderButton';
import { API } from 'aws-amplify'
import creditCardType from 'credit-card-type'


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

  handleChange = (e) => {
    const id = e.target.id
    let cardType = ""

    if (id === "number") {
      cardType = creditCardType(e.target.value)[0].niceType
    }

    this.setState({
      [id]: e.target.value,
      isAlert: false,
      cardType,
    })
  }

  handleSelect = (key, e) => {
    e.persist()
    this.setState({
      [key]: e.target.text
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.state.accountNum !== this.state.accountNumConfirm) {
      this.setState({
        isAlert: true,
        alertMessage: "Confirmation doesn't match Account Number."
      })
      return
    }

    this.setState({ isLoading: true })

    try {
      const rid = this.props.resident.residentId
      const { name, routingNum, accountNum, accountType } = this.state
      const prevBankAccount = this.props.resident.bankAccount
      const bankAccount = !prevBankAccount || prevBankAccount.length > 0
        ? [{ name, routingNum, accountNum, accountType }]
        : [...prevBankAccount, { name, routingNum, accountNum, accountType }]

      await API.put('apt', `/residents/updateBankAccount/${rid}`, {
        body: {
          bankAccount
        }
      })
      this.props.updateResident(rid)
      this.props.handleModalClose()
    } catch (e) {
      console.log(e, e.response)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <StyledModal
        show={this.props.modalShow}
        onHide={this.props.handleModalClose}>
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
                  <Form.Label>CVC</Form.Label>
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
              onClick={this.props.handleModalClose}>Cancel</Button>
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
