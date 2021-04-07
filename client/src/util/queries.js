import gql from 'graphql-tag'

export const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      username
      email
      imageUrl
    }
  }
`

export const FETCH_POSTS_QUERY = gql`
  query($category: String, $offset: Int, $limit: Int) {
    getPosts(category: $category, offset: $offset, limit: $limit) {
      paginatedPosts {
        id
        body
        author {
          username
          imageUrl
          id
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
          createdAt
          body
        }
      }
      totalPostsCount
      matchedResultsCount
    }
  }
`
export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      category
      createdAt
      author {
        username
        imageUrl
      }
      likeCount
      likes {
        id
        createdAt
      }
      commentCount
      comments {
        id
        createdAt
        body
      }
    }
  }
`
