import React, { Component } from 'react'
import { Form, Row, Col, Container } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton.js";
import styled from 'styled-components'


const StyledContainer = styled(Container)`
  margin-top: 5em;
  max-width: 500px;
`

export class ContactUs extends Component {
  state = {
    subject: "",
    content: "",
    isLoading: false,
  }

  validateForm() {
    return this.state.subject.length > 0 && this.state.content.length > 0;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    this.setState({ isLoading: true })

    try {
      alert("Email is sent!")
      console.log("Submitted", this.state.subject, this.state.content)
      this.props.history.push('/')
    } catch (e) {
      console.log(e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <StyledContainer>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="subject">
            <Form.Label column sm={2}>
              Subject
              </Form.Label>
            <Col sm={10}>
              <Form.Control type="text"
                onChange={this.handleChange}
                value={this.state.subject}
                autoFocus />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="content">
            <Form.Label column sm={2}>
              Content
            </Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows="10"
                onChange={this.handleChange}
                value={this.state.content} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <LoaderButton
                block
                variant={`outline-${this.props.theme.buttonTheme}`}
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Submit"
                loadingText="Submitting..."
              />

            </Col>
          </Form.Group>
        </Form>
      </StyledContainer>
    )
  }
}

export default ContactUs
