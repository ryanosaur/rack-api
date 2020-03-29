const { DataTypes } = require('sequelize')

const MatchResults = sequelize =>
  sequelize.define(
    'match_results',
    {
      input_bucket: { type: DataTypes.STRING },
      input_prefix: { type: DataTypes.STRING },
      input_filename: { type: DataTypes.STRING },
      similarity_bucket: { type: DataTypes.STRING },
      similarity_prefix: { type: DataTypes.STRING },
      similarity_filename: { type: DataTypes.STRING },
      similarity_score: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )

module.exports = MatchResults
