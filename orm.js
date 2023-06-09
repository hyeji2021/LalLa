const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto("lalla_db", "lullu", "lalla", {
      host: "34.64.102.12",
      port: "3306",
      dialect: "mysql",
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})
