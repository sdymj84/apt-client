import React, { Component } from 'react'
import { Modal, Button, Form, Dropdown, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import LoaderButton from '../../components/LoaderButton';
import { API } from 'aws-amplify'


const StyledModal = styled(Modal)`
  margin: 1em;
  .modal-footer {
    padding: 0.5em 1em;
  }
  .dropdown-toggle {
    width: 100%;
  }
`

export class AddBankAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      routingNum: "",
      accountNum: "",
      accountNumConfirm: "",
      accountType: "",
      isAlert: false,
      alertMessage: "",
      isLoading: false,
    }
  }

  validateForm = () => {
    const { name, routingNum, accountNum, accountType } = this.state
    return name && routingNum && accountNum && accountType
  }
  validateNumber = (e) => {
    return e.target.value.match(/^[0-9]+$|^$/)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      isAlert: false
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
            <Form.Group controlId="name">
              <Form.Label>Name on Account</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                value={this.state.name} />
            </Form.Group>
            <Form.Group controlId="routingNum">
              <Form.Label>Routing Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  this.validateNumber(e)
                    && this.handleChange(e)
                }
                }
                value={this.state.routingNum} />
            </Form.Group>
            <Form.Group controlId="accountNum">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  this.validateNumber(e)
                    && this.handleChange(e)
                }
                }
                value={this.state.accountNum} />
            </Form.Group>
            <Form.Group controlId="accountNumConfirm">
              <Form.Label>Account Number Confirmation</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  this.validateNumber(e)
                    && this.handleChange(e)
                }
                }
                value={this.state.accountNumConfirm} />
            </Form.Group>
            <Form.Group controlId="accountType">
              <Form.Label>Account Type</Form.Label>
              <Dropdown onSelect={this.handleSelect}>
                <Dropdown.Toggle
                  variant="outline-secondary">
                  {this.state.accountType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="accountType">Checking Account</Dropdown.Item>
                  <Dropdown.Item eventKey="accountType">Savings Account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <Form.Control
                type="text"
                onChange={this.handleChange}
                value={this.state.name} /> */}
            </Form.Group>
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
              loadingText="Saving..."
              disabled={!this.validateForm()} />
          </Modal.Footer>
        </Form>
      </StyledModal>
    )
  }
}

export default AddBankAccount
