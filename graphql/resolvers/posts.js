const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Query: {
    async getPosts(_, { category, offset = 0, limit = 2 }) {
      try {
        const totalPostsCount = await Post.find().countDocuments()
        if (!category) {
          // Return all posts
          const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)

          return {
            posts,
            totalPostsCount,
          }
        }

        // Return all posts filtered, in this case by category
        const paginatedPosts = await Post.find({ category: category })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset),
          matchedResults = await Post.find({ category: category })
            .sort({ createdAt: -1 })
            .countDocuments()

        return {
          paginatedPosts,
          totalPostsCount,
          matchedResults,
        }
      } catch (err) {
        // Error!!!!
        throw new Error(err)
      }
    },

    // get post by id
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(_, { body, category }, context) {
      const user = checkAuth(context)

      if (body.trim() === '' || category.trim() === '') {
        throw new Error('Please fill out both fields')
      }

      const newPost = new Post({
        body,
        category,
        user: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
        createdAt: new Date().toISOString(),
      })

      const post = await newPost.save()

      context.pubsub.publish('NEW_POST', {
        newPost: post,
      })

      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)

      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.delete()
          return 'Post deleted successfully'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username)
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          })
        }

        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
}
