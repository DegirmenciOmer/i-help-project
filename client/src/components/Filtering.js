import React from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'

const options = [
  { key: 's', text: 'Shopping', value: 'Shopping' },
  { key: 'c', text: 'Cleaning', value: 'Cleaning' },
  { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
  { key: 'g', text: 'Cooking', value: 'Cooking' },
  { key: 'ga', text: 'Gardening', value: 'Gardening' },
]

const Filtering = ({ categorySelected, onFilterChange, onOffset, onReset }) => {
  const onChange = (event, { value }) => {
    onFilterChange(value)
    onOffset(0)
  }

  return (
    <>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form.Select
              className='filter-input'
              fluid
              options={options}
              placeholder='Filter'
              value={categorySelected}
              name='filter'
              onChange={onChange}
            />{' '}
          </Grid.Column>
          <Grid.Column>
            <Button
              primary
              className='filter-button'
              onClick={onReset}
            >
              Reset
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Filtering
