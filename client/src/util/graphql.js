import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
<<<<<<< HEAD
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
=======

{
    getPosts{
        id body createdAt username 
        likeCount
        likes{
            id username createdAt
        }
        commentCount
        comments{
            id username createdAt body
        }
    }
}
`
>>>>>>> development
