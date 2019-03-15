import React, { Component } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components'
import Routes from './Routes'
import { Auth, API } from 'aws-amplify'
import Theme from './theme'
import { ThemeProvider } from 'styled-components'


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

  handleLogout = async () => {
    try {
      await Auth.signOut()
      this.userHasAuthenticated(false)
    } catch (e) {
      console.log(e)
      alert(e.message)
    }
  }

  render() {
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
}

export default App;
