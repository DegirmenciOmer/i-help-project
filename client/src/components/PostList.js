import React from 'react'
import PostCard from '../components/PostCard'
import { TransitionGroup } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/queries'
import { Grid } from 'semantic-ui-react'

function PostList({ loading, paginatedPosts, variables }) {
  return (
    <Grid.Row>
      {loading ? (
        <h2>Loading posts ...</h2>
      ) : (
        <TransitionGroup>
          {paginatedPosts &&
            paginatedPosts.map((post) => (
              <Grid.Column fluid key={post.id} style={{ marginBottom: 20 }}>
                <PostCard
                  post={post}
                  postsQuery={{ query: FETCH_POSTS_QUERY, variables }}
                />
              </Grid.Column>
            ))}
        </TransitionGroup>
      )}
    </Grid.Row>
  )
}

export default PostList
