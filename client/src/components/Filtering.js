import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

const options = [
  { key: 's', text: 'Shopping', value: 'Shopping' },
  { key: 'c', text: 'Cleaning', value: 'Cleaning' },
  { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
  { key: 'g', text: 'Cooking', value: 'Cooking' },
  { key: 'ga', text: 'Gardening', value: 'Gardening' },
]

const Filtering = ({
  matchedResultsCount,
  categorySelected,
  onFilterChange,
  onOffset,
  onReset,
}) => {
  const onChange = (event, { value }) => {
    onFilterChange(value)
    onOffset(0)
  }
  //why columns act like rows and rows vice versa?
  return (
    <>
      <Grid.Row>
        <Grid.Column width={6}>
          <Form.Select
            className='filter-input'
            fluid
            options={options}
            placeholder='Filter'
            value={categorySelected}
            name='filter'
            onChange={onChange}
          />
        </Grid.Column>
        <Button primary className='filter-button' onClick={onReset}>
          Reset
        </Button>
        <Grid.Column className='recent-posts-h1'>
          {categorySelected ? (
            <h1>
              Recent Posts on {categorySelected} ({matchedResultsCount})
            </h1>
          ) : (
            <h1>Recent Posts</h1>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  )
}

export default Filtering
