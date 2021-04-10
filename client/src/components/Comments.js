import React from 'react'
import { Card } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import { useMutation } from '@apollo/client'
import moment from 'moment'

import { DELETE_COMMENT_MUTATION } from '../util/mutations'

const Comments = ({ user, comments, postId }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION)

  function handleCommentDelete(commentId) {
    deleteComment({
      variables: {
        postId,
        commentId,
      },
    })
  }

  return (
    <div>
      {comments.map((comment) => (
        <Card key={comment.id} fluid>
          <Card.Content>
            {user && user.id === comment.author.id && (
              <DeleteButton
                content='Delete Comment'
                onDelete={() => handleCommentDelete(comment.id)}
              />
            )}
            <Card.Header>
              {comment.author.username}{' '}
              <span className='commit-header'>
                {moment(comment.createdAt).fromNow()}:
              </span>
            </Card.Header>
            <Card.Meta></Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </div>
  )
}

export default Comments
