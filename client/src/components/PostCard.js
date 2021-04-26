import React, { useContext } from 'react'
import { Card, Image, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import CommentButton from '../components/CommentButton'
import EditPost from '../components/EditPost'

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
  onDelete,
  editTools,
  showProfileImage,
  shouldLinkToPost,
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
  const LinkComponent = shouldLinkToPost ? Link : ''
  const commentButton = <CommentButton commentCount={commentCount} />

  return (
    <Card fluid>
      <Card.Content>
        {showProfileImage && (
          <Image floated='right' size='mini' src={imageUrl} />
        )}
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={LinkComponent} to={`/posts/${id}`}>
          in {category} category
        </Card.Meta>
        <Grid.Column></Grid.Column>
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
          <Card.Description as={LinkComponent} to={`/posts/${id}`}>
            {body}
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        {shouldLinkToPost ? (
          <Link to={`/posts/${id}`}>{commentButton}</Link>
        ) : (
          commentButton
        )}

        {user && user.username === username && (
          <DeleteButton onDelete={onDelete} postId={id} />
        )}
      </Card.Content>
    </Card>
  )
}

export default PostCard
