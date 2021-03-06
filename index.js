const { ApolloServer, gql } = require('apollo-server')
const db = require('./src/db')
const Victim = require('./src/victim')(db)
const SuspiciousActivityReport = require('./src/suspicious_activity_report')(db)
const MatchResult = require('./src/match_result')(db)
const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })

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

  type MatchResult {
    input_bucket: String
    input_prefix: String
    input_filename: String
    similarity_bucket: String
    similarity_prefix: String
    similarity_filename: String
    similarity_score: String
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
    url: String
    race: String
    location_observed: String
  }

  type Query {
    victims: [Victim]
    matchResults: [MatchResult]
    suspiciousActivityReport: [SuspiciousActivityReport]
  }

  type File {
    url: String!
  }

  input SuspiciousActivityReportInput {
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
    race: String
    location_observed: String
  }

  type Mutation {
    addSuspiciousActivityReport(
      report: SuspiciousActivityReportInput!
    ): SuspiciousActivityReport
    uploadFile(file: Upload!, sarId: ID!): File
  }
`

const resolvers = {
  Query: {
    victims: () => Victim.findAll(),
    matchResults: () => MatchResult.findAll(),
    suspiciousActivityReport: () => SuspiciousActivityReport.findAll()
  },
  Mutation: {
    addSuspiciousActivityReport: (_p, { report }) =>
      SuspiciousActivityReport.create(report),
    uploadFile: (_p, { file, sarId }) =>
      file.then(file => {
        s3 = new AWS.S3({ apiVersion: '2006-03-01' })
        const uploadParams = {
          Bucket: 'racksaruploads',
          Key: `${sarId}/${file.filename}`,
          Body: ''
        }
        const fileStream = file.createReadStream()
        fileStream.on('error', err => console.log('File Error', err))
        uploadParams.Body = fileStream
        s3.upload(uploadParams, function(err, data) {
          if (err) {
            console.log('Error', err)
            return Promise.reject(err)
          }
          console.log('Upload Success', data.Location)
          SuspiciousActivityReport.update(
            {
              url: data.Location,
              bucket: 'racksaruploads',
              prefix: `${sarId}`,
              filename: file.filename
            },
            { where: { id: sarId } }
          )
          return Promise.resolve()
        })
      })
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
