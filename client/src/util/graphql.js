import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
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

// export const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts(filter: { "Cleaning" }) {
//       id
//       body
//       category
//       createdAt
//       username
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;
