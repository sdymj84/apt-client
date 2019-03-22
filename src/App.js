import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styled, { createGlobalStyle } from 'styled-components'
import Routes from './Routes'
import ManagerRoutes from './ManagerRoutes'
import { Auth, API } from 'aws-amplify'
import Theme from './theme'
import { ThemeProvider } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
  }
`

const StyledContainer = styled(Container)`
  margin-top: 15px;

  .navbar-brand a {
    color: ${props => props.theme.brandColor};
    text-decoration: none;
    font-weight: bold;
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticating: true,
      isAuthenticated: false,
      uid: null,
      resident: null,
      theme: Theme.Basic
    }
  }

  componentDidMount = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await this.userHasAuthenticated(currentUser.username)
    } catch (e) {
      console.log(e, e.response)
    }

    this.setState({ isAuthenticating: false })
  }


  userHasAuthenticated = async (uid) => {
    let resident = null
    try {
      resident = await API.get('apt', `/residents/${uid}`)
    } catch (e) {
      console.log(e)
      console.log("Error response : ", e.response)
    }

    this.setState({
      isAuthenticated: uid ? true : false,
      uid,
      resident
    })
  }

  managerHasAuthenticated = async (uid) => {
    console.log(uid)
    if (uid === "58e15cde-7dca-4453-9336-0bd368960c9e") {
      this.setState({ isManagerAuthenticated: true })
    } else {
      this.setState({ isManagerAuthenticated: false })

      try {
        await Auth.signOut()
      } catch (e) {
        console.log(e)
        alert(e.message)
      }
      alert("Please use manager account")
    }
  }

  handleLogout = async () => {
    try {
      await Auth.signOut()
      this.userHasAuthenticated(false)
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
  }

  handleManagerLogout = async () => {
    try {
      await Auth.signOut()
      this.managerHasAuthenticated(false)
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
  }

  renderResident() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      uid: this.state.uid,
      userHasAuthenticated: this.userHasAuthenticated,
      resident: this.state.resident,
      theme: this.state.theme
    }
    return (
      !this.state.isAuthenticating &&
      <ThemeProvider theme={this.state.theme}>
        <StyledContainer>
          <GlobalStyle />
          <Navbar variant="light" bg="light" expand="md">
            <Navbar.Brand>
              <Link to='/'>SAVOY</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ml-auto">
                {this.state.isAuthenticated
                  ? <Nav.Link onClick={this.handleLogout}>Resident Logout</Nav.Link>
                  : <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </StyledContainer>
      </ThemeProvider>
    );
  }

  renderManager() {
    const childProps = {
      isManagerAuthenticated: this.state.isManagerAuthenticated,
      managerHasAuthenticated: this.managerHasAuthenticated,
      theme: this.state.theme
    }
    return (
      !this.state.isAuthenticating &&
      <ThemeProvider theme={this.state.theme}>
        <StyledContainer>
          <Navbar variant="light" bg="light" expand="md">
            <Navbar.Brand>
              <Link to='/manager'>SAVOY Management</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ml-auto">
                {this.state.isManagerAuthenticated
                  ? <Nav.Link onClick={this.handleManagerLogout}>Manager Logout</Nav.Link>
                  : <LinkContainer to='/manager/login'>
                    <Nav.Link>Manager Login</Nav.Link>
                  </LinkContainer>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <ManagerRoutes childProps={childProps} />
        </StyledContainer>
      </ThemeProvider>
    );
  }

  render() {
    return (/^\/manager/.test(this.props.location.pathname))
      ? this.renderManager()
      : this.renderResident()
  }
}

export default withRouter(App);
