import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { DELETE_POST_MUTATION } from '../util/mutations'
import NewPopup from '../util/NewPopup'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import CommentButton from '../components/CommentButton'

import { useMutation } from '@apollo/client'

const PostCard = ({
  post: {
    body,
    category,
    createdAt,
    id,
    author: { username, imageUrl },
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
  const postMoment = moment(createdAt).fromNow(true)

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini' src={imageUrl} />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          in {category} category
        </Card.Meta>
        <Grid.Column></Grid.Column>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {postMoment} ago
        </Card.Meta>
        <Link to={`/posts/${id}`}>
          <Card.Description>{body}</Card.Description>
        </Link>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Link to={`/posts/${id}`}><CommentButton commentCount={commentCount}/></Link>

        {user && user.username === username && (
          <DeleteButton onDelete={handleDeletePost} postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
