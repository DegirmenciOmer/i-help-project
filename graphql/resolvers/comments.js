const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../util/check-auth')
const Post = require('../../models/Post')

module.exports = {
  Mutation: {
    //create comment
    createComment: async (_, { postId, body }, context) => {
      const { id } = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty',
          },
        })
      }

      const post = await Post.findById(postId)

      if (post) {
        const newComment = {
          body,
          user: id,
          createdAt: new Date().toISOString(),
        }
        post.comments.unshift(newComment)
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    //delete comment
    async deleteComment(_, { postId, commentId }, context) {
      const { id } = checkAuth(context)
      console.log(id, 'context id')

      const post = await Post.findById(postId)

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId)

        console.log(post.comments[0]._id, 'post.comments[0]._id')
        console.log(commentIndex, 'commentIndex')
        console.log(commentId, 'commentId')
        console.log(
          post.comments[commentIndex].user,
          'post.comments[commentIndex].user'
        )

        if (post.comments[commentIndex].user == id) {
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Post not found')
      }
    },
  },
}
