// combine all resolvers
const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comment');

module.exports = {
    Post: {
        likeCount(parent) {
            console.log(parent);
            return parent.likes.length;
        },
        commentCount(parent) {
            return parent.comments.length
        },
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        
    },
    Subscription: { 
        ...postResolvers.Subscription
    }
}
