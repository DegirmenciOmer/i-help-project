const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const { MONGODB } = require('./config.js')
const resolvers = require('./graphql/resolvers/index')

const pubsub = new PubSub()

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`)
  })
  .catch((err) => {
    console.error(err)
  })
