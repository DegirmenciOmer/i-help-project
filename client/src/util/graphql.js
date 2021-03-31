import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
  query($category: String, $offset: Int, $limit: Int) {
    getPosts(category: $category, offset: $offset, limit: $limit) {
      paginatedPosts {
        id
        body
        author {
          id
          username
        }
        category
        createdAt

        likeCount
        likes {
          id
        }
        commentCount
        comments {
          id
          username {
            username
          }
          createdAt
          body
        }
      }
      totalPostsCount
      matchedResultsCount
    }
  }
`
