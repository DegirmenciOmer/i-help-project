import { gql } from '@apollo/client'
//post mutations

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $category: String!) {
    createPost(body: $body, category: $category) {
      id
      body
      category
      createdAt
      author {
        username
        imageUrl
      }
      likes {
        id
        user {
          username
        }
        createdAt
      }
      likeCount
      comments {
        author {
          username
          id
        }
        id
        body
        createdAt
      }
      commentCount
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $body: String!) {
    updatePost(body: $body, postId: $postId) {
      id
      body
      category
      createdAt
      author {
        username
      }

      likes {
        id
        createdAt
      }
      likeCount
      comments {
        id
        body
        createdAt
      }
      commentCount
    }
  }
`
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

//user mutations

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`
export const UPDATE_USER_MUTATION = gql`
  mutation($userId: ID!, $imageUrl: String, $email: String!) {
    updateUser(userId: $userId, imageUrl: $imageUrl, email: $email) {
      username
      email
      imageUrl
    }
  }
`

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $imageUrl: String
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        imageUrl: $imageUrl
      }
    ) {
      id
      email
      createdAt
      username
      imageUrl
      token
    }
  }
`
export const FETCH_USER_MUTATION = gql`
  mutation($userId: ID!, $imageUrl: String, $email: String!) {
    updateUser(userId: $userId, imageUrl: $imageUrl, email: $email) {
      email
      author {
        username
        imageUrl
      }
    }
  }
`
//comment mutations

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        author {
          username
          id
        }
      }
      commentCount
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        createdAt
        body
        author {
          id
          username
        }
      }
      commentCount
    }
  }
`
