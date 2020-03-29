const { ApolloServer, gql } = require('apollo-server')
const db = require('./src/db')
const Victim = require('./src/victim')(db)
const SuspiciousActivityReport = require('./src/suspicious_activity_report')(db)

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

  type SuspiciousActivityReport {
    id: ID
    suspicion_type: String
    date_observed: String
    time_observed: String
    room_number: String
    room_registered_name: String
    gender: String
    age_observed: String
    ethnicity: String
    hair_color: String
    hair_length: String
    noteable_features: String
    additional_victim: Boolean
    additional_criminal: Boolean
    license_number: String
    license_state: String
    why_vehicle_suspicious: String
    anything_else: String
  }

  type Query {
    victims: [Victim]
    suspiciousActivityReport: [SuspiciousActivityReport]
  }
`

const resolvers = {
  Query: {
    victims: () => Victim.findAll(),
    suspiciousActivityReport: () => SuspiciousActivityReport.findAll()
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
