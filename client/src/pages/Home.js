import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Form, Grid, TransitionGroup } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const options = [
    { key: 's', text: 'Shopping', value: 'Shopping' },
    { key: 'c', text: 'Cleaning', value: 'Cleaning' },
    { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
    { key: 'g', text: 'Cooking', value: 'Cooking' },
    { key: 'ga', text: 'Gardening', value: 'Gardening' },
  ];

  if (!data) {
    return null;
  }

  const { getPosts: posts } = data;
  console.log(data);

  return (
    <div>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column floated='right' width={5}>
          <Grid.Row>
            <h1>Filtering</h1>
          </Grid.Row>
          <Grid.Row>
            <Form.Select
              fluid
              label='Category'
              options={options}
              placeholder='Category'
              name='category'
              // onChange={onChange}
              // value={values.category}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid>

      <Grid columns={3}>
        <Grid.Row className='page-title'>
          <h1>Recents posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h2>Loading posts ...</h2>
          ) : (
            <TransitionGroup>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
