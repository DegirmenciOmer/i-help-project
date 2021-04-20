import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Card, Grid, Icon, Image, Label, Form } from 'semantic-ui-react'
import moment from 'moment'
import { useForm } from '../util/hooks'
import { FETCH_POST_QUERY } from '../util/queries'
import LikeButton from '../components/LikeButton'
import Comments from '../components/Comments'
import { AuthContext } from '../context/auth'
import NewPopup from '../util/NewPopup'
import CommentButton from '../components/CommentButton'
import { UPDATE_POST_MUTATION } from '../util/mutations'
import SubmitComments from '../components/SubmitComments'

const SinglePost = (props) => {
  const [toggle, setToggle] = useState(false)
  const postId = props.match.params.postId
  const { user } = useContext(AuthContext)
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  })
  const { values, onChange, onSubmit, setValues } = useForm(
    updatePostCallback,
    {
      body: '',
      postId,
    }
  )
  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      setToggle(false)
    },
    onError(err) {
      console.log(err && err.graphQLErrors[0] ? err.graphQLErrors[0] : err)
    },
  })

  function updatePostCallback() {
    updatePost()
  }

  useEffect(() => {
    if (!data) {
      return
    }
    setValues((prevState) => ({ ...prevState, body: data.getPost.body }))
    // eslint-disable-next-line
  }, [data, postId])

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
      author: { username: authorName, imageUrl: authorImg },
      comments,
      likes,
      likeCount,
      commentCount,
    } = post

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image floated='right' size='small' src={authorImg} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{authorName}</Card.Header>
                <div className='floated'>
                  <Card.Meta>
                    {moment(createdAt).fromNow()}
                    {`-${category}`}
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
                <CommentButton commentCount={commentCount}/>
              </Card.Content>
            </Card>
            <SubmitComments postId={postId} user={user} />
            <Comments postId={postId} comments={comments} user={user} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return postMarkup
}

export default SinglePost
