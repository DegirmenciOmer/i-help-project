// combine all resolvers
const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comment');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length

    },
    Query: {
        ...postResolvers.Query,
        uploads: (parent, args) => {}
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        uploadImage: (parent, args) => {
            return args.file.then(file => {
                new Promise(async (resolves, rejects) => {
                    const { filename, mimetype, createReadStream } = await file;

                    let filesize = 0;
                    let stream = createReadStream();

                    stream.on("data", data => {
                    filesize += data.length;
                    });

                    stream.on("end", () =>
                    resolves({
                        filename,
                        mimetype,
                        filesize
                    })
                    );

                    stream.on("error", rejects);
            })
                return file;
            });
        },
    },
    Subscription: { 
        ...postResolvers.Subscription
    }
}

