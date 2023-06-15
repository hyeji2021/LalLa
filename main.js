const express = require("express");//express 요청
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const db = require("./models/index.js");
const mysql = require('mysql2');
const passport = require('passport'); //로그인 시 필요
const bcrypt = require('bcrypt');
const path = require('path');

app.set("view engine", "ejs"); //ejs 사용
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public")); //외부에서 public 디렉토리 접근 가능
app.set("port", process.env.PORT || 80);

//body-parser 추가
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // Express 미들웨어 설정

db.sequelize.sync({force : false}) // 서버 실행시 MySQL 과 연동되도록 하는 sync 메서드 
.then(() => {
    console.log('데이터 베이스 연결 성공');
})
.catch((err) => {
    console.log(err);
});

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: '34.64.102.12',
  user: 'lullu',
  password: 'lalla',
  database: 'lalla_db'
});
//로그인 성공시 메시지 띄우기
app.use('/login', (req, res, next) => {
  res.locals.showSuccessMessage=false;
  res.locals.successMessage='';
  next();
});

//로그인 실패시 메시지 띄우기
app.use('/login', (req, res, next) => {
  res.locals.showErrorMessage=false;
  res.locals.errorMessage='';
  next();
});

// 로그인 페이지 라우트 처리
app.get('/login', (req, res) => {
  res.render('login');
});

// 로그인 라우트
app.post('/login', (req, res) => {
  const { userID, password } = req.body;

  // User 테이블에서 userID와 password를 가져오는 쿼리 실행
  const query = `SELECT * FROM User WHERE userID = ? AND password = ?`;
  connection.query(query, [userID, password], (err, results) => {
    if (err) {
      // 쿼리 실행 중 오류가 발생한 경우
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length === 1) {
        // 로그인 성공
      res.locals.showSuccessMessage=true;
      res.locals.successMessage='로그인에 성공했습니다.';
      res.render('layout');
      } else {
        // 로그인 실패
        res.locals.showErrorMessage = true;
        res.locals.errorMessage = '아이디 혹은 패스워드를 확인하세요.';
        res.render('login');
      }
    }
  });
});

// 회원가입  페이지 라우트 처리
app.get('/sighUp', (req, res) => {
  res.render('signUp');
});

// 회원가입 라우트
app.post('/signUp', (req, res) => {
  const { userID, password, userName, nickname, gender, birth,  phone } = req.body;

  // 회원 정보를 저장하는 함수
  function saveUser(userID, password, userName, nickname, gender, birth, phone) {
    // MySQL에 회원 정보를 삽입하는 쿼리를 작성합니다.
    const query = `INSERT INTO User (userID, password, userName, nickname, gender, birth,  phone) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;

    // 쿼리 실행을 위해 값들을 배열로 전달합니다.
    const values = [userID, password, userName, nickname, gender, birth,  phone];

    // MySQL에 쿼리를 실행합니다.
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving user:', error);
        return;
      }
      console.log('User saved successfully!');
    });
  }

  // 회원가입이 성공적으로 완료되었을 때 리다이렉트할 경로로 설정합니다.
  const redirectURL = '/login'; // 회원가입 완료 후 이동할 페이지 경로

  // saveUser 함수 호출을 추가합니다.
  saveUser(userID, password, userName, nickname, gender, birth,  phone);

  // 회원가입 완료 후 로그인 페이지로 리다이렉트합니다.
  res.redirect(redirectURL);
});


//URL 연결
app.get("/hobby", homeController.showHobby); //취미
app.get("/login", homeController.showLogin); //로그
app.get("/auction", homeController.showAuction); //경매
app.get("/", homeController.getTopThreeHobbies);
app.get("/serve", homeController.getServe);//serve페이지 
app.get("/signUp", homeController.showSignUp);//signUp page
app.use(errorController.pageNotFoundError); //에러 처리 추가
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => { //80번 포트 리스닝 설정
        console.log(`Server running at http://localhost:${app.get("port")}`);
});
