import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styled, { createGlobalStyle } from 'styled-components'
import Routes from './Routes'
import { Auth, API } from 'aws-amplify'
import Theme from './theme'
import { ThemeProvider } from 'styled-components'
import AnnouncementAlert from './components/AnnouncementAlert';


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
    this._isMounted = false
    this.state = {
      isAuthenticating: true,
      isAuthenticated: false,
      resident: null,
      apart: null,
      payments: null,
      isAnnouncementConfirmed: false,
      theme: Theme.Basic
    }
  }

  componentDidMount = async () => {
    this._isMounted = true
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await this.userHasAuthenticated(currentUser.username)
    } catch (e) {
      console.log(e, e.response)
    }

    this._isMounted && this.setState({ isAuthenticating: false })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  userHasAuthenticated = async (uid) => {
    let resident = null
    let apart = null
    let payments = null
    let isAnnouncementConfirmed = false
    if (uid) {
      try {
        resident = await API.get('apt', `/residents/${uid}`)
        apart = await API.get('apt', `/aparts/${resident.apartId}`)
        payments = await API.get('apt', `/payments/${resident.apartId}`)
        payments = payments.Items
      } catch (e) {
        console.log(e, e.response)
      }
    }

    if (apart) {
      const i = apart.residents.findIndex(res =>
        res.id === resident.residentId)
      isAnnouncementConfirmed = apart.residents[i].isAnnouncementConfirmed
    }

    this.setState({
      isAuthenticated: uid ? true : false,
      resident,
      apart,
      payments,
      isAnnouncementConfirmed
    })
  }

  updateResident = async (uid) => {
    let resident = null
    if (uid) {
      try {
        resident = await API.get('apt', `/residents/${uid}`)
      } catch (e) {
        console.log(e, e.response)
      }
    }

    this.setState({ resident })
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

  handleDismissAlert = async () => {
    try {
      await API.put('apt',
        `/aparts/${this.state.apart.apartId}/confirmAnnouncement/${this.state.resident.residentId}`, {
          body: {
            isAnnouncementConfirmed: true
          }
        })
    } catch (e) {
      console.log(e, e.response)
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      updateResident: this.updateResident,
      resident: this.state.resident,
      apart: this.state.apart,
      payments: this.state.payments,
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

          {this.state.apart &&
            <AnnouncementAlert
              apart={this.state.apart}
              isAnnouncementConfirmed={this.state.isAnnouncementConfirmed}
              handleDismissAlert={this.handleDismissAlert}
            />}

          <Routes childProps={childProps} />
        </StyledContainer>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
