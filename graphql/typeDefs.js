const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    category: String!
    createdAt: String!
    author: User!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type PostsResponse {
    paginatedPosts: [Post]
    totalPostsCount: Int!
    matchedResultsCount: Int
  }
  type Comment {
    id: ID!
    createdAt: String!
    author: User!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    user: User!
    body: String!
  }
  type User {
    id: ID!
    email: String!
    imageUrl: String
    token: String!
    username: String!
    createdAt: String!
  }
  type File {
    filename: String!
    mimetype: String!
    filesize: Int!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
    imageUrl: String
  }
  type Query {
    getPosts(category: String, offset: Int, limit: Int): PostsResponse
    getPost(postId: ID!): Post
    getUser(userId: ID!): User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    updateUser(userId: ID!, imageUrl: String, email: String!): User!
    login(username: String!, password: String!): User!
    createPost(body: String!, category: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    updatePost(postId: ID!, body: String!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`
