import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const EditPost = ({ onSubmit, body, onChange, values }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Form.Input
          className='EditInput'
          placeholder={body}
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button color='teal' type='submit'>
          Save
        </Button>
      </Form.Field>
    </Form>
  )
}

export default EditPost
