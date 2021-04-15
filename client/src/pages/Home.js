import React, { useContext, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'
import { FETCH_POSTS_QUERY } from '../util/queries'
import Filtering from '../components/Filtering'
import Paginate from '../components/Paginate'
import { INITIAL_VARIABLES } from '../constants/constants'
import PostList from '../components/PostList'
import { useQuery } from '@apollo/client'

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
    <>
      <Grid columns={1}>
        {user && (
          <PostForm
            categoryFiltered={categorySelected}
            postsQuery={{ query: FETCH_POSTS_QUERY, variables }}
            user={user}
          />
        )}
        <Filtering
          categorySelected={categorySelected}
          onFilterChange={setCategory}
          onOffset={setOffset}
          onReset={handleFiltersReset}
          matchedResultsCount={matchedResultsCount}
        />
        <PostList
          loading={loading}
          paginatedPosts={paginatedPosts}
          variables={variables}
        />

        <Paginate
          setOffset={setOffset}
          matchedResultsCount={matchedResultsCount}
          offset={offset}
          totalPostsCount={totalPostsCount}
        />
      </Grid>
    </>
  )
}

export default Home
