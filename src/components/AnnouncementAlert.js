import React, { Component } from 'react'
import { Alert, Button } from "react-bootstrap";
import styled from 'styled-components'


const StyledAlert = styled(Alert)`
  margin: 5px;
`

export class AnnouncementAlert extends Component {

  state = {
    alertShow: true,
  }

  handleShow = () => {
    this.setState({ alertShow: true })
  }

  handleHide = () => {
    this.props.handleDismissAlert() // Need to implement on parent and pass down
    this.setState({ alertShow: false })
  }

  render() {
    return (
      <StyledAlert show={Boolean(this.state.alertShow && !this.props.isAnnouncementConfirmed)}
        onClose={this.handleHide}
        variant="danger">
        <Alert.Heading>Announcement From The Office</Alert.Heading>
        <p>{this.props.apart.announcement}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={this.handleHide} variant="outline-secondary">
            Understood the announcement and no longer want to see
          </Button>
        </div>
      </StyledAlert>
    )
  }
}

export default AnnouncementAlert

