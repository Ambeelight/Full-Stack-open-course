import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import User from './models/user.js'

mongoose.set('strictQuery', false)
config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((e) => console.log('error connection to MongoDB:', e))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
