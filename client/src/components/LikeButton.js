import React, { useState, useEffect } from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

import NewPopup from '../util/NewPopup'

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  })

  const likeButton = liked ? (
    <Button color='teal'>
      <Icon name='heart' />
    </Button>
  ) : (
    <Button color='teal' basic>
      <Icon name='heart' />
    </Button>
  )

  return user ? (
    <NewPopup content='Like on post'>
      <Button as='div' labelPosition='right' onClick={likePost}>
        {likeButton}
        <Label basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </NewPopup>
  ) : (
    <NewPopup content='Like on post'>
      <Button color='teal' labelPosition='right' basic as={Link} to='/login'>
        <Button color='teal' basic>
          <Icon name='heart' />
        </Button>
        <Label basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </NewPopup>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`

export default LikeButton
