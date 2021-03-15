import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Grid, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'

import Filtering from '../components/Filtering'
import NewPopup from '../util/NewPopup'

const Home = () => {
  const [categorySelected, setCategory] = useState()
  const [pageNum, setPageNum] = useState(0)
  const [limit, setLimit] = useState(1)
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      offset: pageNum,
      limit: limit,
      category: categorySelected,
    },
  })

  if (!data) {
    return null
  }

  const {
    getPosts: { paginatedPosts, totalPostsCount, matchedResults },
  } = data
  console.log(paginatedPosts, totalPostsCount, matchedResults)
  //pageNum > totalPostsCount / limit + 1 ? setLimit(0) : setLimit(1)
  console.log(
    'limit: ',
    limit,
    'pagenum: ',
    pageNum,
    'matched: ',
    matchedResults
  )

  return (
    <div>
      <Grid>
        <Grid.Column floated='left' width={5}>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Row></Grid.Row>
      </Grid>

      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Filtering
              categorySelected={categorySelected}
              onFilterChange={setCategory}
            />
          </Grid.Column>
          <Grid.Column>
            <h1>Recent Posts</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h2>Loading posts ...</h2>
          ) : (
            <TransitionGroup>
              {paginatedPosts &&
                paginatedPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column position='right'>
            {pageNum > 0 && (
              <NewPopup content='Previous'>
                <Button
                  className='ui basic icon button'
                  onClick={() => setPageNum(pageNum - 1)}
                >
                  <i className='fas fa-chevron-circle-left'></i>
                </Button>
              </NewPopup>
            )}
            {pageNum < matchedResults - 1 && (
              <NewPopup content='Next'>
                <Button
                  className='ui basic icon button'
                  onClick={() => setPageNum(pageNum + 1)}
                >
                  <i className='fas fa-chevron-circle-right'></i>
                </Button>
              </NewPopup>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Home
