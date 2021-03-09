import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useQuery, gql } from '@apollo/client';

// const Filtering = ({ onDataComplited }) => {
const Filtering = () => {
  const options = [
    { key: 's', text: 'Shopping', value: 'Shopping' },
    { key: 'c', text: 'Cleaning', value: 'Cleaning' },
    { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
    { key: 'g', text: 'Cooking', value: 'Cooking' },
    { key: 'ga', text: 'Gardening', value: 'Gardening' },
  ];

  const [category, setCategory] = useState('cleaning');

  const onChange = (event, { value }) => {
    setCategory(value);
  };

  const { data } = useQuery(FETCH_FILTER_QUERY, {
    variables: { category },
  });

  if (!data) {
    return null;
  }

  const { filterPosts: posts } = data;
  console.log(data);
  // onDataComplited(data);

  return (
    <>
      <Form>
        <Form.Select
          fluid
          label='Category'
          options={options}
          placeholder='Filter'
          defaultValue=''
          name='filter'
          onChange={onChange}
        />
      </Form>
    </>
  );
};

export default Filtering;

const FETCH_FILTER_QUERY = gql`
  query($category: String!) {
    filterPost(category: $category) {
      id
      body
      category
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
