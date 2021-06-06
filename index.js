const { ApolloServer, PubSub } = require('apollo-server')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index.js')
const dotenv = require('dotenv')
const { connectDB } = require('./db.js')

const pubsub = new PubSub()

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

dotenv.config()

connectDB()
