import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  query($category: String) {
    getPosts(category: $category) {
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
  }
`;
