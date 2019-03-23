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

    this.setState({ isLoading: true })

    if (this.state.newPassword !== this.state.newPasswordConfirm) {
      alert("Confirm password don't match")
      this.setState({ isLoading: false })
      return
    }

    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, this.state.oldPassword, this.state.newPassword)
      this.setState({ isLoading: false })
      alert('Password is successfully changed!')
      this.props.history.push('/')
    } catch (e) {
      console.log(e)
      if (e.message === "Incorrect username or password.") {
        alert("Old password is wrong.")
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
              text="Save New Password"
              loadingText="Updating…"
            />

          </Form.Group>
        </Form>
      </StyledContainer>
    )
  }
}

export default ChangePassword
