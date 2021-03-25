import React, { useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { useForm } from '../util/hooks'

const options = [
  { key: 's', text: 'Shopping', value: 'Shopping' },
  { key: 'c', text: 'Cleaning', value: 'Cleaning' },
  { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
  { key: 'g', text: 'Cooking', value: 'Cooking' },
  { key: 'ga', text: 'Gardening', value: 'Gardening' },
]

const PostForm = ({ categoryFiltered, postsQuery }) => {
  const { values, setValues, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
    category: categoryFiltered || '',
  })
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION)

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      category: categoryFiltered
    }))
  }, [categoryFiltered, setValues])

  function createPostCallback() {
    createPost({
      variables: values,
      onError(err) {
        console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err)
      },
      refetchQueries: [postsQuery]
    })
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
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

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $category: String!) {
    createPost(body: $body, category: $category) {
      id
      body
      category
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export default PostForm
