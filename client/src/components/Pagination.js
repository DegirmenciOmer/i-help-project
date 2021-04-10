import React from 'react'
import { Button, Grid, Pagination } from 'semantic-ui-react'
import { PAGINATION_LIMIT } from '../constants/constants'

const Pagination = ({ totalPostsCount, offset, matchedResultsCount }) => {
  function nextPage() {
    setOffset((offset) => offset + PAGINATION_LIMIT)
  }

  function previousPage() {
    setOffset((offset) => offset - PAGINATION_LIMIT)
  }

  function isFirstPage() {
    return PAGINATION_LIMIT * offset <= 0
  }

  function isLastPage() {
    if (matchedResultsCount) {
      return (
        offset / PAGINATION_LIMIT ===
        Math.ceil(matchedResultsCount / PAGINATION_LIMIT) - 1
      )
    } else {
      return (
        offset / PAGINATION_LIMIT ===
        Math.ceil(totalPostsCount / PAGINATION_LIMIT) - 1
      )
    }
  }

  return (
    <Grid.Column position='right'>
      {!isFirstPage() && (
        <Button className='ui basic icon button' onClick={previousPage}>
          <i className='fas fa-chevron-circle-left'></i>
        </Button>
      )}

      {matchedResultsCount > PAGINATION_LIMIT ||
        (totalPostsCount > PAGINATION_LIMIT && !isLastPage() && (
          <Button className='ui basic icon button' onClick={nextPage}>
            <i className='fas fa-chevron-circle-right'></i>
          </Button>
        ))}
    </Grid.Column>
  )
}

export default Pagination
