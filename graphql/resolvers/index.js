// combine all resolvers
const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
    author: async (post) => {
      //field resolver
      await post.populate('user').execPopulate()

      return post.user
    },
  },
  Like: {
    user: async (like) => {
      //field resolver
      await like.populate('user').execPopulate()

      return like.user
    },
  },
  Comment: {
    author: async (comment) => {
      //field resolver
      await comment.populate('user').execPopulate()

      return comment.user
    },
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
}
