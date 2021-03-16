import React, { useContext, useState } from 'react'
import { useQuery} from '@apollo/client'
import { Button, Grid, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/graphql'

import Filtering from '../components/Filtering'
import NewPopup from '../util/NewPopup'

const PAGINATION_LIMIT = 2;

const Home = () => {
  const [category, setCategory] = useState()
  const [offset, setOffset] = useState(0)
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      offset,
      limit: PAGINATION_LIMIT,
      category
    },
  });

  if (!data) {
    return null
  }

  const {
    getPosts: { paginatedPosts, totalPostsCount },
  } = data

  function updateCachePosts(proxy, postId) {
    const variables = {
      offset: offset,
      limit: PAGINATION_LIMIT,
      category,
    }
    const data = proxy.readQuery({
      query: FETCH_POSTS_QUERY,
      variables
    });

    // create a new variable for refresh result
    const newDataGroups = [...data.getPosts.paginatedPosts]
    newDataGroups[postId.id] = newDataGroups.filter((p) => p.id !== postId);

    proxy.writeQuery({
      query: FETCH_POSTS_QUERY,
      variables,
      data: {
        ...data,
        getPosts: { paginatedPosts: { newDataGroups } },
      },
    })
  }


  function nextPage() {
    setOffset((offset) => offset + PAGINATION_LIMIT);
  }

  function previousPage() {
    setOffset(offset => offset - PAGINATION_LIMIT);
  }

  function isFirstPage() {
    return PAGINATION_LIMIT * offset <= 0;
  }

  function isLastPage() {
    return PAGINATION_LIMIT * offset >= totalPostsCount;
  }

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
            <Filtering category={category} onFilterChange={setCategory} />
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
                    <PostCard post={post} onDeletePost={updateCachePosts} />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column position='right'>
            {!isFirstPage() && (
              <NewPopup content='Previous'>
                <Button
                  className='ui basic icon button'
                  onClick={previousPage}
                >
                  <i className='fas fa-chevron-circle-left'></i>
                </Button>
              </NewPopup>
            )}
            {!isLastPage() && (
              <NewPopup content='Next'>
                <Button
                  className='ui basic icon button'
                  onClick={nextPage}
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

export default Home;
