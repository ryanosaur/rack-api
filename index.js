const { ApolloServer, gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Victim {
    id: ID
    firstName: String
    lastName: String
  }

  type Query {
    victims: [Victim]
  }
`

const victims = [
  {
    id: 1,
    firstName: 'Harry Potter and the Chamber of Secrets',
    lastName: 'J.K. Rowling'
  },
  {
    id: 2,
    firstName: 'Jurassic Park',
    lastName: 'Michael Crichton'
  }
]

const resolvers = {
  Query: {
    victims: () => victims
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
