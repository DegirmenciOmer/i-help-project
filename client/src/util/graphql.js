import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
  query($category: String, $offset: Int, $limit: Int) {
    getPosts(category: $category, offset: $offset, limit: $limit) {
      paginatedPosts {
        id
        body
        imageUrl
        category
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
      totalPostsCount
      matchedResultsCount
    }
  }
`
