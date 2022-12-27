const express = require('express');
const db = require('./models/index');
const user = require('./routes/user');
const passport = require('passport');
const passportConfig = require('./passport/index');
const session = require('express-session');

const app = express();
passportConfig();
app.use(express.json(), express.urlencoded({ extended: false }));
// json() 데이터를 읽게 해주고 body-parser
// url 데이터를 query나 param을 nodejs 내부 모듈로 읽겠다. 확장 프로그램 허용X

db.sequelize
    .sync()
    .then(console.log('DB연결 성공!!'))
    .catch(err => console.log(err));

app.use(
    session({
        secret: 'secret',
        resace: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 30 * 60000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);

app.listen(3000, () => {
    console.log('3000번으로 서버 실행 중');
});
