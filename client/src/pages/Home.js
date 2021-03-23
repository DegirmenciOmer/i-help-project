import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'

import Filtering from '../components/Filtering'

const Home = () => {
  const [categorySelected, setCategory] = useState()
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: { category: categorySelected },
  })

  if (!data) {
    return null
  }

  const { getPosts: posts } = data

  function updatePostCache(proxy, result) {
    const data = proxy.readQuery({
      query: FETCH_POSTS_QUERY,
      variables: { category: categorySelected }
    })
    const newData = [result.data.createPost, ...data.getPosts]

    proxy.writeQuery({
      query: FETCH_POSTS_QUERY,
      variables: { category: categorySelected  },
      data: {
        ...data,
        getPosts: newData,
      },
    })
  }

  return (
    <div>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm categoryFiltered={categorySelected} onPostCreated={updatePostCache} />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Row></Grid.Row>
      </Grid>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Filtering
              categorySelected={categorySelected}
              onFilterChange={setCategory}
            />
          </Grid.Column>
          <Grid.Column>
            <h1>Recents Posts</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h2>Loading posts ...</h2>
          ) : (
            <TransitionGroup>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard categorySelected={categorySelected} post={post} />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
