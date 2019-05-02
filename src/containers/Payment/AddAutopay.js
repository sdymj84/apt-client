import React, { Component } from 'react'
import { Modal, Button, Form, Dropdown, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import LoaderButton from '../../components/LoaderButton';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


const StyledModal = styled(Modal)`
  margin: 1em;
  #autopay-modal {
    max-width: 400px;
  }
  .modal-footer {
    padding: 0.5em 1em;
  }
  .dropdown-toggle {
    width: 100%;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
`

export class AddAutopay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      payOnDay: "",
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      isAlert: false
    })
  }

  handleSelect = (key) => {
    this.setState({ payOnDay: key })
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date })
  }
  handleEndDateChange = (date) => {
    this.setState({ endDate: date })
  }

  render() {
    return (
      <StyledModal
        id='autopay-modal'
        show={this.props.modalShow}
        onHide={this.props.handleModalClose}>
        <Form onSubmit={(e) => this.props.handleSubmit(this.state, e)}>

          <Modal.Body>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control as={DatePicker}
                required
                minDate={new Date()}
                onChange={this.handleStartDateChange}
                selected={this.state.startDate} />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control as={DatePicker}
                required
                minDate={new Date()}
                onChange={this.handleEndDateChange}
                selected={this.state.endDate} />
            </Form.Group>

            <Form.Group controlId="payOnDay">
              <Form.Label>Pay on Day</Form.Label>
              <Dropdown onSelect={this.handleSelect}>
                <Dropdown.Toggle
                  variant="outline-secondary">
                  {this.state.payOnDay}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="2nd">2nd</Dropdown.Item>
                  <Dropdown.Item eventKey="3rd">3rd</Dropdown.Item>
                  <Dropdown.Item eventKey="4th">4th</Dropdown.Item>
                  <Dropdown.Item eventKey="5th">5th</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
              isLoading={this.props.isLoading}
              text="Save"
              loadingText="Saving..." />
          </Modal.Footer>

        </Form>
      </StyledModal>
    )
  }
}

export default AddAutopay
