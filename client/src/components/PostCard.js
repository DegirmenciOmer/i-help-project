import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import NewPopup from '../util/NewPopup'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const PostCard = ({
  post: {
    body,
    category,
    imageUrl,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  },
  postsQuery,
}) => {
  const { user } = useContext(AuthContext)
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION)

  function handleDeletePost() {
    deletePostMutation({
      variables: {
        postId: id,
      },
      onError(err) {
        console.log(err)
      },
      refetchQueries: [postsQuery],
    })
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src={imageUrl} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
          {`-${category}`}
        </Card.Meta>
        <Link to={`/posts/${id}`}>
          <Card.Description>{body}</Card.Description>
        </Link>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <NewPopup content='Comment on post'>
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button color='blue' basic>
              <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </NewPopup>

        {user && user.username === username && (
          <DeleteButton onDelete={handleDeletePost} postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export default PostCard
