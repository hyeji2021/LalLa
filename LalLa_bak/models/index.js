console.log(__dirname);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {}; //실제 데이터베이스가 이 db객체와 연결됨
//데이터베이스와 연결, 시퀄라이즈 ORM 객체 생성
let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize; //인스턴스
db.Sequelize = Sequelize; //라이브러

db.Hobby = require("../models/Hobby")(sequelize, Sequelize);
db.Level = require("../models/Level")(sequelize, Sequelize);
db.Category = require("../models/Category")(sequelize, Sequelize);
db.AuctionItem = require("../models/AuctionItem")(sequelize, Sequelize);
module.exports = db;
