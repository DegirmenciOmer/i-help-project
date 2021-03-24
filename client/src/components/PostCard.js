import React, { useContext } from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import NewPopup from '../util/NewPopup'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import { FETCH_POSTS_QUERY } from '../util/graphql'

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
  categorySelected,
}) => {
  const { user } = useContext(AuthContext)

  function updatePostCache(proxy) {
    const data = proxy.readQuery({
      query: FETCH_POSTS_QUERY,
      variables: { category: categorySelected },
    })
    // remove an element from an array
    const newData = data.getPosts.filter((post) => post.id !== id)

    proxy.writeQuery({
      query: FETCH_POSTS_QUERY,
      variables: { category: categorySelected },
      data: {
        ...data,
        getPosts: newData,
      },
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
        <Card.Description>{body}</Card.Description>
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
          <DeleteButton onDelete={updatePostCache} postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
