import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import NewPopup from '../util/NewPopup'

const DeleteButton = ({ postId, onDelete, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update: onDelete,
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
