const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const session = require('express-session');

const app = express();
app.set('port', 3000);
app.use(cookieParser('secret'), express.json(), express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secret',
        resave: false, // 세션 값이 같으면 다시 저장하지 않는 로직
        saveUninitialized: false,
        // req 메시지가 들어왔을 때 session에 작업이 이루어지지 않았다면 저장 x
        cookie: {
            httpOnly: true,
            maxAge: 5 * 60000,
        },
        // 프론트엔드에게 전달될 세션 id 쿠키
    })
);

dotenv.config();
console.log(process.env.DB_PASSWORD);

//쿠기 설정
app.post('/setcookie', (req, res) => {
    res.cookie(
        'token',
        { token: 'token' },
        {
            /*
            쿠키 설정 
            signed: 암호화 된 쿠키
            secure: https만 사용할게 할건지
            htppOnly: 웹 서버 통신으로만 사용가능
            */
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
        }
    );
    res.send('ok');
});

//쿠키 해석
app.get('/showcookie', (req, res) => {
    try {
        if (req.session.member.email !== '1234') return res.send('미인증');
        res.send(req.cookies.token);
    } catch (err) {
        res.send('미인증');
    }
});

//세션 로그인
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!(email === '1234' && password === '1234'))
        return res.status(400).send('아이디와 비밀번호를 확인해주세요');

    req.session.member = {
        email,
    };

    res.status(200).json({ message: 'ok' });
});

//세션 로그아웃
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('logout');
    });
    res.status(200).send('로그아웃');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번으로 서버 실행 중`);
});
