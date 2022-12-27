const express = require('express');
const db = require('./models/index');
const user = require('./routes/user');
const todo = require('./routes/todo');
const passport = require('passport');
const passportConfig = require('./passport/index');
const session = require('express-session');

const app = express();
app.set('port', 9000);

db.sequelize
    .sync()
    .then(() => {
        console.log('DB연결 성공하였습니다.');
    })
    .catch((err) => console.log(err));

passportConfig();
app.use(express.json(), express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secret',
        resave: false,
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
app.use('/todo', todo);

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 서버 실행 중`);
});
