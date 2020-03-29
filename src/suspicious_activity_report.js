const { DataTypes } = require('sequelize')

const SuspiciousActivityReport = sequelize =>
  sequelize.define(
    'suspicious_activity_report',
    {
      suspicion_type: { type: DataTypes.STRING },
      date_observed: { type: DataTypes.STRING },
      time_observed: { type: DataTypes.STRING },
      room_number: { type: DataTypes.STRING },
      room_registered_name: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      age_observed: { type: DataTypes.STRING },
      ethnicity: { type: DataTypes.STRING },
      hair_color: { type: DataTypes.STRING },
      hair_length: { type: DataTypes.STRING },
      noteable_features: { type: DataTypes.TEXT },
      additional_victim: { type: DataTypes.BOOLEAN },
      additional_criminal: { type: DataTypes.BOOLEAN },
      license_number: { type: DataTypes.STRING },
      license_state: { type: DataTypes.STRING },
      filename: { type: DataTypes.STRING },
      why_vehicle_suspicious: { type: DataTypes.TEXT },
      bucket: { type: DataTypes.STRING },
      prefix: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      race: { type: DataTypes.STRING },
      location_observed: { type: DataTypes.STRING },
      anything_else: { type: DataTypes.TEXT }
    },
    { timestamps: false }
  )

module.exports = SuspiciousActivityReport
