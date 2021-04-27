import React from 'react'
import PostCard from '../components/PostCard'
import { DELETE_POST_MUTATION } from '../util/mutations'
import { TransitionGroup } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/queries'
import { Grid } from 'semantic-ui-react'

import { useMutation } from '@apollo/client'

function PostList({ loading, paginatedPosts, variables }) {
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION)

  function handleDeletePost(id) {
    deletePostMutation({
      variables: {
        postId: id,
      },
      onError(err) {
        console.log(err)
      },
      refetchQueries: [{ query: FETCH_POSTS_QUERY, variables }],
    })
  }

  return (
    <Grid.Row>
      {loading ? (
        <h2>Loading posts ...</h2>
      ) : (
        <TransitionGroup>
          {paginatedPosts &&
            paginatedPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard
                  post={post}
                  onDelete={() => handleDeletePost(post.id)}
                  isListedPost={true}
                />
              </Grid.Column>
            ))}
        </TransitionGroup>
      )}
    </Grid.Row>
  )
}

export default PostList
