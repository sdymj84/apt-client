import React from 'react'
import styled from 'styled-components'
import LoaderButtonNoDiv from './LoaderButtonNoDiv';


const StyledLoaderButton = styled(LoaderButtonNoDiv)`
  padding: 4px 12px;
  display: inline;
`

const DeleteButton = ({ row, accessor, CustomFunction }) => {
  const handleDelete = () => {
    CustomFunction(row.index)
  }
  return (
    <StyledLoaderButton
      variant="outline-danger"
      text="Delete"
      loadingText="Deleting..."
      isLoading={row.isLoading}
      onClick={handleDelete} />
  )
}

export default DeleteButton
