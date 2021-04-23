import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'
import CommentButton from '../components/CommentButton'
import EditPost from '../components/EditPost'
import moment from 'moment'

const SinglePostCard = ({
  post,
  toggle,
  user,
  setToggle,
  onChange,
  onSubmit,
  values,
}) => {
  const {
    id,
    body,
    category,
    createdAt,
    author: { username: authorName },
    likes,
    likeCount,
    commentCount,
  } = post
  const postMoment = moment(createdAt).fromNow()

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{authorName}</Card.Header>
        <div className='floated'>
          <Card.Meta>
            {postMoment} - {category}
          </Card.Meta>
          <Card.Meta>
            {user && user.username === authorName && (
              <Icon
                onClick={() => setToggle(true)}
                name='pencil alternate'
              ></Icon>
            )}
          </Card.Meta>
        </div>
        {!toggle ? (
          <Card.Description>{body}</Card.Description>
        ) : (
          <EditPost
            onChange={onChange}
            onSubmit={onSubmit}
            body={body}
            values={values}
          />
        )}
      </Card.Content>
      <hr />
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likeCount, likes }} />
        <CommentButton commentCount={commentCount} />
      </Card.Content>
    </Card>
  )
}

export default SinglePostCard
