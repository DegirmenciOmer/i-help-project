const gql = require('graphql-tag');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type User {
        id: ID!
        email: String!
        imageUrl: String!
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
        imageUrl: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post 
        uploads: File!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        uploadImage(file: Upload!): File!
    }
    type Subscription {
    newPost: Post!
    }
`;


