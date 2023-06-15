const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();

// 사용자 데이터베이스 대신에 간단히 객체를 사용합니다.
const users = [
  {
    id: '1',
    username: 'user1',
    password: '$2b$10$5CI3vZMbBWhPByBzD79U4uAYv9Y.KxU.kB.nK2DwtuP2CuhQ.bQnO', // "password1"
  },
  {
    id: '2',
    username: 'user2',
    password: '$2b$10$v6HbT2kKctQ56wGB/L7qauP3XqLEAjjmTpIeVXY7AQ5E7Inow36N2', // "password2"
  },
];

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
// Passport 설정
passport.use(
  new LocalStrategy((username, password, done) => {
    // 사용자를 검색합니다.
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호를 비교합니다.
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: '잘못된 비밀번호입니다.' });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

// 로그인 라우트
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// 로그인 페이지
app.get('/login', (req, res) => {
    res.render("login");
});

// 서버 시작
app.listen(80, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
