const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AuctionItem', {
    auctionNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itemName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'categoryID'
      }
    },
    startingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    askingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    auctionQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    conditions: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    itemDetail: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    deliveryMtd: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
		sellerID: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'User',
        key: 'userID'
      }
    },
    winnerID: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'User',
        key: 'userID'
      }
    },
    finalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    progress: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "전"
    }
  }, {
    sequelize,
    tableName: 'AuctionItem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "auctionNum" },
        ]
      },
      {
        name: "categoryID",
        using: "BTREE",
        fields: [
          { name: "categoryID" },
        ]
      },
			{
        name: "sellerID",
        using: "BTREE",
        fields: [
          { name: "sellerID" },
        ]
      },
      {
        name: "winnerID",
        using: "BTREE",
        fields: [
          { name: "winnerID" },
        ]
      },
    ]
  });
};
