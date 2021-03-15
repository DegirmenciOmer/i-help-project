import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import NewPopup from '../util/NewPopup'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false)

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
          variables: {
            offset: pageNum,
            limit: limit,
            category: category,
          },
        })
        // create a new variable for refresh result
        console.log(data)
        const newDataGroups = [...data.getPosts.paginatedPosts]
        console.log(newDataGroups, 'newdatagroup')
        newDataGroups[postId.id] = newDataGroups.filter((p) => p.id !== postId)
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            ...data,
            getPosts: { paginatedPosts: { newDataGroups } },
          },
        })
      }

      if (callback) callback()
    },
    variables: {
      postId,
      commentId,
    },
    onError(err) {
      console.log(err)
    },
  })

  return (
    <>
      <NewPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </NewPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`

export default DeleteButton
