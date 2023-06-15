onst express = require("express");//express 요청
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const db = require("./models/index.js");

const passport = require('passport'); //로그인 시 필요
const bcrypt = require('bcrypt');
const path = require('path');

app.set("view engine", "ejs"); //ejs 사용
app.set("views", path.join(__dirname, "views"));
//app.use(layouts); //레이아웃 등록

app.use(express.static("public")); //외부에서 public 디렉토리 접근 가능
app.set("port", process.env.PORT || 3000);

//body-parser 추가
app.use(
        express.urlencoded({
                extended: false
        })
);
app.use(express.json()); // Express 미들웨어 설정

db.sequelize.sync({force : false}) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드 
.then(() => {
    console.log('데이터 베이스 연결 성공');
})
.catch((err) => {
    console.log(err);
});

//URL 연결
app.get("/hobby", homeController.showHobby); //취미
app.get("/login", homeController.showLogin); //로그인
app.get("/error", errorController.pageNotFoundError); //에러
app.get("/", homeController.getTopThreeHobbies);
app.get("/auction", homeController.showAuction); //경매
app.get("/signup", homeController.showSignup); //회원가입

app.use(errorController.pageNotFoundError); //에러 처리 추가
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { //80번 포트 리스닝 설정
        console.log(`Server running at http://localhost:${app.get("port")}`);
});
