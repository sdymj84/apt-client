import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  text-align: center;
  padding-top: 100px;
`

const NotFound = () => {
  return (
    <StyledContainer>
      <h3>Sorry page not found!</h3>
    </StyledContainer>
  )
}

export default NotFound
