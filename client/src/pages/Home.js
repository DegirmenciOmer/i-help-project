import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, TransitionGroup } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/queries'
import Filtering from '../components/Filtering'
import Paginate from '../components/Paginate'

import { INITIAL_VARIABLES } from '../constants/constants'

const Home = () => {
  const [categorySelected, setCategory] = useState(INITIAL_VARIABLES.category)
  const [offset, setOffset] = useState(INITIAL_VARIABLES.offset)
  const { user } = useContext(AuthContext)
  const variables = {
    offset,
    limit: INITIAL_VARIABLES.limit,
    category: categorySelected,
  }
  const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
    variables,
    fetchPolicy: 'network-only',
  })

  if (!data) {
    return null
  }

  const {
    getPosts: { paginatedPosts, totalPostsCount, matchedResultsCount },
  } = data

  async function handleFiltersReset() {
    setOffset(INITIAL_VARIABLES.offset)
    setCategory(INITIAL_VARIABLES.category)
  }

  return (
    <div>
      <Grid>
        <Grid.Column width={6}>
          {user && (
            <PostForm
              categoryFiltered={categorySelected}
              postsQuery={{ query: FETCH_POSTS_QUERY, variables }}
            />
          )}
        </Grid.Column>
        <Grid.Row></Grid.Row>
      </Grid>

      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Filtering
              categorySelected={categorySelected}
              onFilterChange={setCategory}
              onOffset={setOffset}
              onReset={handleFiltersReset}
            />
          </Grid.Column>
          <Grid.Column>
            {categorySelected ? (
              <h1>
                Recent Posts on {categorySelected} ({matchedResultsCount})
              </h1>
            ) : (
              <h1>Recent Posts</h1>
            )}
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
                    <PostCard
                      post={post}
                      postsQuery={{ query: FETCH_POSTS_QUERY, variables }}
                    />
                  </Grid.Column>
                ))}
            </TransitionGroup>
          )}
        </Grid.Row>
        <Paginate
          setOffset={setOffset}
          matchedResultsCount={matchedResultsCount}
          offset={offset}
          totalPostsCount={totalPostsCount}
        />
      </Grid>
    </div>
  )
}

export default Home
