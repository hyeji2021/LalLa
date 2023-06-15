const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Level', {
    skillLevel: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "초",
      primaryKey: true
    },
    hobbyName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Hobby',
        key: 'hobbyName'
      }
    },
    supply: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Level',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "skillLevel" },
          { name: "hobbyName" },
        ]
      },
      {
        name: "hobbyName",
        using: "BTREE",
        fields: [
          { name: "hobbyName" },
        ]
      },
    ]
  });
};
