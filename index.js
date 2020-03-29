const { ApolloServer, gql } = require('apollo-server')
const db = require('./src/db')
const Victim = require('./src/victim')(db)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Victim {
    id: ID
    name: String
    dob: String
    date_missing: String
    eyes: String
    hair: String
    height: String
    weight: String
    sex: String
    age_at_disappearance: String
    circumstances: String
    other: String
    city: String
    state: String
    country: String
  }

  type Query {
    victims: [Victim]
  }
`

const resolvers = {
  Query: {
    victims: () => Victim.findAll()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
  })
  .error(error => console.error('Unable to connect to the database:', error))
