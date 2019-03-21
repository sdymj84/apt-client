import React, { Component } from 'react'
import { Form, Row, Col, Container } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton.js";
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin-top: 5em;
  max-width: 500px;
`

export class ManagerLogin extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
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
      const user = await Auth.signIn(this.state.email, this.state.password)
      await this.props.managerHasAuthenticated(user.username)
      this.setState({ isLoading: false })
    } catch (e) {
      console.log(e)
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    if (this.props.isManagerAuthenticated) {
      return <Redirect to='/manager' />
    }

    return (
      <StyledContainer>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email
              </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
                autoFocus />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="password">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password} />
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
                text="Login"
                loadingText="Logging in…"
              />

            </Col>
          </Form.Group>
        </Form>
      </StyledContainer>
    )
  }
}

export default ManagerLogin