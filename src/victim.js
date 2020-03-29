const { DataTypes } = require('sequelize')

const Victim = sequelize =>
  sequelize.define(
    'victim',
    {
      id: { type: DataTypes.NUMBER, primaryKey: true },
      name: { type: DataTypes.STRING },
      dob: { type: DataTypes.STRING },
      date_missing: { type: DataTypes.STRING },
      eyes: { type: DataTypes.STRING },
      hair: { type: DataTypes.STRING },
      height: { type: DataTypes.STRING },
      weight: { type: DataTypes.STRING },
      sex: { type: DataTypes.STRING },
      age_at_disappearance: { type: DataTypes.STRING },
      circumstances: { type: DataTypes.STRING },
      other: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING }
    },
    { timestamps: false }
  )

module.exports = Victim
