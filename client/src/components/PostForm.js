import React, { useEffect } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useForm } from '../util/hooks'
import { CREATE_POST_MUTATION } from '../util/mutations'

const options = [
  { key: 's', text: 'Shopping', value: 'Shopping' },
  { key: 'c', text: 'Cleaning', value: 'Cleaning' },
  { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
  { key: 'g', text: 'Cooking', value: 'Cooking' },
  { key: 'ga', text: 'Gardening', value: 'Gardening' },
]

const PostForm = ({ categoryFiltered, postsQuery, user }) => {
  const { values, setValues, onChange, onSubmit } = useForm(
    createPostCallback,
    {
      body: '',
      category: categoryFiltered || '',
    }
  )
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION)

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      category: categoryFiltered,
    }))
  }, [categoryFiltered, setValues])

  async function createPostCallback() {
    await createPost({
      variables: values,
      refetchQueries: [postsQuery],
      onError(err) {
        console.log(err)
      },
    })
  }
  return (
    <>
      <Grid.Row>
        <Grid.Column>
          <h2 className='create-post-h2'>Create a post:</h2>
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={6}>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Form.Select
              fluid
              options={options}
              placeholder='Category'
              name='category'
              onChange={onChange}
              value={values.category}
              disabled={!!categoryFiltered}
            />

            <Form.Input
              placeholder='Create new post'
              name='body'
              onChange={onChange}
              value={values.body}
            />
            <Button color='teal' type='submit'>
              Submit
            </Button>
          </Form.Field>
        </Form>
      </Grid.Column>

      {error &&
        Array.isArray(error.graphQLErrors) &&
        error.graphQLErrors.length > 0 && (
          <div className='ui error message' style={{ marginBottom: 20 }}>
            <ul className='list'>
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
    </>
  )
}

export default PostForm
