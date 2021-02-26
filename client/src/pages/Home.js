import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = () => {
  const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);
  console.log(error);

  if (!data) {
    return null;
  }

  const { getPosts: posts } = data;

  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className='page-title'>
          <h1>Recents posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h2>Loading posts ...</h2>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
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

export default Home;
