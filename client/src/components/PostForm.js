import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const PostForm = () => {
  const [errors, setErrors] = useState([]);

  const options = [
    { key: 's', text: 'Shopping', value: 'Shopping' },
    { key: 'c', text: 'Cleaning', value: 'Cleaning' },
    { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
    { key: 'g', text: 'Cooking', value: 'Cooking' },
    { key: 'ga', text: 'Gardening', value: 'Gardening' },
  ];

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
    category: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      console.log(result);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
    },
    // onError(err) {
    //   console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err);
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Select
            fluid
            label='Category'
            options={options}
            placeholder='Category'
            name='category'
            onChange={onChange}
            value={values.category}
            error={errors ? true : false}
          />

          <Form.Input
            placeholder='Create new post'
            name='body'
            onChange={onChange}
            value={values.body}
            error={errors ? true : false}
          />
          <Button color='teal' type='submit'>
            Submit
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}

      {/* {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
};

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
`;

export default PostForm;
