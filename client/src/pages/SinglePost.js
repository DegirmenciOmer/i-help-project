import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Grid, Image } from 'semantic-ui-react'
import { useForm } from '../util/hooks'
import { FETCH_POST_QUERY } from '../util/queries'
import Comments from '../components/Comments'
import { AuthContext } from '../context/auth'
import { UPDATE_POST_MUTATION } from '../util/mutations'
import SubmitComments from '../components/SubmitComments'
import SinglePostCard from '../components/SinglePostCard'

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
      author: { imageUrl: authorImg },
      comments,
    } = post

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image floated='right' size='small' src={authorImg} />
          </Grid.Column>
          <Grid.Column width={10}>
            <SinglePostCard
              toggle={toggle}
              post={post}
              user={user}
              setToggle={setToggle}
              onChange={onChange}
              onSubmit={onSubmit}
              values={values}
            />
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
