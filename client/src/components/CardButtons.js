import React from 'react'
import { Link } from 'react-router-dom'

import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import CommentButton from '../components/CommentButton'

const CardButtons = ({
  likeCount,
  commentCount,
  likes,
  id,
  username,
  onDelete,
  isListedPost,
  user,
}) => {
  const commentButton = <CommentButton commentCount={commentCount} />

  return (
    <>
      <LikeButton user={user} post={{ id, likes, likeCount }} />

      {isListedPost ? (
        <Link to={`/posts/${id}`}>{commentButton}</Link>
      ) : (
        commentButton
      )}

      {user && user.username === username && isListedPost && (
        <DeleteButton onDelete={onDelete} postId={id} />
      )}
    </>
  )
}

export default CardButtons
