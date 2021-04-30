import React, { useContext } from 'react'
import { Card, Image, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import EditPost from '../components/EditPost'
import CardButtons from './CardButtons'

const PostCard = ({
  post: {
    body,
    category,
    createdAt,
    id,
    likeCount,
    commentCount,
    likes,
    author: { username, imageUrl },
  },
  editTools,
  onDelete,
  isListedPost,
}) => {
  const { user } = useContext(AuthContext)
  const postMoment = moment(createdAt).fromNow(true)
  const {
    isInEditMode,
    toggleEditMode,
    onChange,
    onSubmit,
    values,
  } = editTools || {
    isInEditMode: false,
  }
  const canEdit = editTools !== undefined
  const LinkComponent = isListedPost ? Link : ''

  return (
    <Card fluid>
      <Card.Content>
        {isListedPost && <Image floated='right' size='mini' src={imageUrl} />}
        <Card.Header>{username}</Card.Header>
        <Grid.Column>
          <Card.Meta as={LinkComponent} to={`/posts/${id}`}>
            in {category} category
          </Card.Meta>
        </Grid.Column>
        <Card.Meta as={LinkComponent} to={`/posts/${id}`}>
          {postMoment} ago
        </Card.Meta>
        <div className='floated'>
          <Card.Meta>
            {canEdit && user && user.username === username && (
              <Icon onClick={toggleEditMode} name='pencil alternate'></Icon>
            )}
          </Card.Meta>
        </div>

        {isInEditMode ? (
          <EditPost
            onChange={onChange}
            onSubmit={onSubmit}
            body={body}
            values={values}
          />
        ) : (
          <Card.Description extra as={LinkComponent} to={`/posts/${id}`}>
            {body}
          </Card.Description>
        )}
      </Card.Content>

      <Card.Content extra>
        <CardButtons
          likeCount={likeCount}
          commentCount={commentCount}
          likes={likes}
          id={id}
          username={username}
          isListedPost={isListedPost}
          user={user}
          onDelete={onDelete}
        />
      </Card.Content>
    </Card>
  )
}

export default PostCard
