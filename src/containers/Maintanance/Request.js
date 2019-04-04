/* 
1. Enter all info for the maintanace request
2. Upload photo if needed
3. Submit -> ConfirmModal (Submitted, another request?)
*/

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Container, Button, Form, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import Amplify, { API, Auth } from 'aws-amplify'
import LoaderButton from '../../components/LoaderButton'
import ConfirmModal from '../../components/ConfirmModal'
import AlertModal from '../../components/AlertModal'


const StyledContainer = styled(Container)`
  margin-top: 3em;
  max-width: 550px;
`

const StyledForm = styled(Form)`
  margin-top: 2em;
  width: 100%;
  button {
    margin: 2em 0;
  }

  .dropdown button {
    width: 100%;
    margin: 0;
  }
`

export class Request extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      priority: "",
      where: "",
      description: "",
      accessInst: "",
      permissionToEnter: "",
      attachment: "",
    }
  }

  validateForm = () => {
    return true
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleDropdownChange = (key, event) => {
    event.persist()
    this.setState({
      [key]: event.target.text
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <StyledContainer>
        <h1>Make Maintanance Request</h1>
        <hr />
        <StyledForm onSubmit={this.handleSubmit}>

          <Form.Group as={Row}>
            <Form.Label column sm={3}>Priority*</Form.Label>
            <Col sm={9}>
              <Dropdown
                onSelect={this.handleDropdownChange}>
                <Dropdown.Toggle
                  variant={`outline-${this.props.theme.buttonTheme}`}>
                  {this.state.priority}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="priority">NORMAL</Dropdown.Item>
                  <Dropdown.Item eventKey="priority">HIGH</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="where">
            <Form.Label column sm={3}>Where*</Form.Label>
            <Col sm={9}>
              <Form.Control type="text" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="description">
            <Form.Label column sm={3}>Full Description*</Form.Label>
            <Col sm={9}>
              <Form.Control as="textarea" rows={5} />
              <div>1499 characters remaining</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="accessInst">
            <Form.Label column sm={3}>Access Instructions</Form.Label>
            <Col sm={9}>
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="permissionToEnter">
            <Form.Label column sm={3}>Permission to Enter*</Form.Label>
            <Col sm={9}>
              <Dropdown
                onSelect={this.handleDropdownChange}>
                <Dropdown.Toggle
                  variant={`outline-${this.props.theme.buttonTheme}`}>
                  {this.state.permissionToEnter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="permissionToEnter">YES</Dropdown.Item>
                  <Dropdown.Item eventKey="permissionToEnter">NO</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="attachment">
            <Form.Label column sm={3}>Attachment</Form.Label>
            <Col sm={9} className="d-flex align-items-center">
              <Form.Control type="file" />
            </Col>
          </Form.Group>

          <Form.Group>
            <LoaderButton
              block
              variant={`outline-${this.props.theme.buttonTheme}`}
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Submit"
              loadingText="Submitting…"
            />
          </Form.Group>

        </StyledForm>
      </StyledContainer>
    )
  }
}

export default Request
