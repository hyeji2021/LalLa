const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hobby', {
    hobbyName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'categoryID'
      }
    },
    spring: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    summer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fall: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    winter: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    inside: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    outside: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    takeTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Hobby',
    timestamps: false,
    indexes: [
                {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hobbyName" },
        ]
      },
      {
        name: "categoryID",
        using: "BTREE",
        fields: [
          { name: "categoryID" },
        ]
      },
    ]
  });
};
