import React, { Component } from 'react'
import { Form, Container } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "../../components/LoaderButton.js";
import styled from 'styled-components'


const StyledContainer = styled(Container)`
  margin-top: 5em;
  max-width: 400px;
`

export class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    isLoading: false,
  }

  validateForm() {
    return this.state.oldPassword.length > 0
      && this.state.newPassword.length > 0
      && this.state.newPasswordConfirm.length > 0;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.state.email === "admin@savoy.com") {
      alert("You cannot use manager account on residents page")
      return
    }

    this.setState({ isLoading: true })

    try {
      const user = await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(user.username)
      console.log(user)
    } catch (e) {
      console.log(e)
      if (e.code === "UserNotConfirmedException") {
        alert("You need to change password before login, please check email.")
      } else {
        alert(e.message)
      }
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <StyledContainer>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="oldPassword">
            <Form.Label>
              Old Password
            </Form.Label>
            <Form.Control type="password"
              onChange={this.handleChange}
              value={this.state.oldPassword}
              autoFocus />
          </Form.Group>

          <Form.Group controlId="newPassword">
            <Form.Label>
              New Password
            </Form.Label>
            <Form.Control type="password"
              onChange={this.handleChange}
              value={this.state.newPassword} />
          </Form.Group>

          <Form.Group controlId="newPasswordConfirm">
            <Form.Label>
              Confirm New Password
            </Form.Label>
            <Form.Control type="password"
              onChange={this.handleChange}
              value={this.state.newPasswordConfirm} />
          </Form.Group>

          <Form.Group>
            <LoaderButton
              block
              variant={`outline-${this.props.theme.buttonTheme}`}
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging in…"
            />

          </Form.Group>
        </Form>
      </StyledContainer>
    )
  }
}

export default ChangePassword
