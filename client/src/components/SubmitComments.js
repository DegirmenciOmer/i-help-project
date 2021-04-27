import { React, useRef, useState } from 'react'
import { Card, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { SUBMIT_COMMENT_MUTATION } from '../util/mutations'

const SubmitComments = ({ user, postId }) => {
  const [comment, setComment] = useState('')

  const commentInputRef = useRef(null)

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION)

  function handleCommentSubmit() {
    submitComment({
      update() {
        setComment('')
        commentInputRef.current.blur()
      },
      variables: {
        postId,
        body: comment,
      },
    })
  }

  return (
    user && (
      <Card fluid>
        <Card.Content>
          <Form>
            <div className='ui action input fluid'>
              <input
                type='text'
                name='comment'
                placeholder='Comment on this post'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ref={commentInputRef}
              />
              <button
                type='submit'
                className='ui button teal '
                disabled={comment.trim() === ''}
                onClick={handleCommentSubmit}
              >
                <i className='paper plane icon'></i>
              </button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    )
  )
}

export default SubmitComments
