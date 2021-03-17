import React, { useContext, useState, useRef } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Button, Card, Grid, Icon, Image, Label, Form } from 'semantic-ui-react'
import moment from 'moment'
import DeleteButton from '../components/DeleteButton'
import { useForm } from '../util/hooks'

import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'

const SinglePost = (props) => {
  const [toggle, setToggle] = useState(false)
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('')

  //update post body {
  const { values, onChange, onSubmit } = useForm(updatePostCallback, {
    body: '',
    postId,
  })
  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
        variables: values,
      })
      const newData = [result.data.updatePost, data.getPost]

      console.log(result.data.updatePost)
      console.log(data.getPost)

      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          ...data,
          getPost: {
            newData,
          },
        },
      })
      setToggle(false)
    },
    onError(err) {
      console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err)
    },
  })

  function updatePostCallback() {
    updatePost()
  }

  //}

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  })

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('')
      commentInputRef.current.blur()
    },
    variables: {
      postId,
      body: comment,
    },
  })

  function deletePostCallback() {
    props.history.push('/')
  }

  if (!data) {
    return null
  }
  const { getPost: post } = data

  let postMarkup

  if (!post) {
    postMarkup = <p>Loading...</p>
  } else {
    const {
      id,
      body,
      category,
      createdAt,
      username,
      imageUrl,
      comments,
      likes,
      likeCount,
      commentCount,
    } = post

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image floated='right' size='small' src={imageUrl} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <div className='floated'>
                  <Card.Meta>
                    {moment(createdAt).fromNow()}
                    {`-${category}`}
                  </Card.Meta>
                  <Card.Meta>
                    {user && user.username === username && (
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
                  <Form onSubmit={onSubmit}>
                    <Form.Field>
                      <Form.Input
                        className='EditInput'
                        placeholder={body}
                        name='body'
                        onChange={onChange}
                        value={values.body}
                      />
                      <Button color='teal' type='submit'>
                        Save
                      </Button>
                    </Form.Field>
                  </Form>
                )}
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <NewPopup content='Comment on post'>
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={() => console.log('Comment')}
                  >
                    <Button basic color='blue'>
                      <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentCount}
                    </Label>
                  </Button>
                </NewPopup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        name='comment'
                        placeholder='Left comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card key={comment.id} fluid>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      category
      createdAt
      username
      imageUrl
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $body: String!) {
    updatePost(body: $body, postId: $postId) {
      id
      body
      category
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export default SinglePost
