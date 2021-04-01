// combine all resolvers
const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')
const User = require('../../models/User')

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
      try {
        return await User.findById(like.user)
      } catch (err) {
        return null
      }

    },
  },
  Comment: {
    author: async (comment) => {
      try {
        return await User.findById(comment.user)
      } catch (err) {
        return null
      }
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
