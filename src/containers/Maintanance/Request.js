/* 
1. Enter all info for the maintanace request
2. Upload photo if needed
3. Submit -> ConfirmModal (Submitted, another request?)
*/

import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Container, Button, Form, Col, Row, Dropdown, OverlayTrigger, Popover } from "react-bootstrap";
import LoaderButton from '../../components/LoaderButton'
import ConfirmModal from '../../components/ConfirmModal'
import AlertModal from '../../components/AlertModal'
import config from '../../config'
import { FiAlertCircle } from 'react-icons/fi'
import { API } from 'aws-amplify'
import { s3Upload } from '../../libs/awsLib'


const StyledContainer = styled(Container)`
  margin-top: 3em;
  max-width: 550px;
  .attachment-tooltip {
    color: navy;
    cursor: pointer;
  }
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
    this.file = ""
    this.state = {
      isLoading: false,
      priority: "",
      where: "",
      description: "",
      accessInst: "",
      permissionToEnter: "",
      attachment: "",
      modalShow: false,
      modalMessage: "",
      modalActive: 0,
    }
  }

  validateForm = () => {
    const { priority, where, description, permissionToEnter } = this.state
    return priority.length > 0 && where.length > 0
      && description.length > 0 && permissionToEnter.length > 0
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

  handleFileChange = (e) => {
    this.file = e.target.files[0]
  }

  handleModalClose = () => {
    this.setState({ modalShow: false })
    this.state.modalActive == 2
      && this.props.history.push('/')
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      this.setState({
        modalShow: true,
        modalActive: 1,
        modalMessage: `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`
      })
      return
    }

    this.setState({ isLoading: true })

    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null

      const body = {
        ...this.state,
        apartId: this.props.apart.apartId,
        attachment
      }

      await API.post('apt', '/requests', { body })

      this.setState({
        modalShow: true,
        modalActive: 2,
        modalMessage: "Maintanace request is successfully posted."
          + "We will be visiting normally in 1-2 days, thank you."
      })
      // this.props.history.push('/')
    } catch (e) {
      console.log(e, e.response)
    }
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
              <Form.Control type="text"
                onChange={this.handleChange}
                value={this.state.where} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="description">
            <Form.Label column sm={3}>Full Description*</Form.Label>
            <Col sm={9}>
              <Form.Control as="textarea" rows={5}
                maxLength={1500}
                onChange={this.handleChange}
                value={this.state.description} />
              <div><span>{1500 - this.state.description.length}</span> characters remaining</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="accessInst">
            <Form.Label column sm={3}>Access Instructions</Form.Label>
            <Col sm={9}>
              <Form.Control as="textarea" rows={3}
                onChange={this.handleChange}
                value={this.state.accessInst} />
              <div><span>{1500 - this.state.accessInst.length}</span> characters remaining</div>
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
            <Form.Label column sm={3}>
              Attachment
              <OverlayTrigger trigger="hover" placement="right" overlay={(
                <Popover id="popover-basic">
                  {`Maximum size of the attachment file is ${config.MAX_ATTACHMENT_SIZE / 1000000}MB`}
                </Popover>
              )}>
                <FiAlertCircle className="attachment-tooltip" />
              </OverlayTrigger>

            </Form.Label>
            <Col sm={9} className="d-flex align-items-center">
              <Form.Control type="file"
                onChange={this.handleFileChange} />
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

        <AlertModal
          modalShow={this.state.modalShow}
          modalClose={this.handleModalClose}
          modalMessage={this.state.modalMessage}
          theme={this.props.theme} />
      </StyledContainer>
    )
  }
}

export default Request
