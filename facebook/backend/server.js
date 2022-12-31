const express = require('express');
const path = require('path');
const app = express();

// 메인 페이지 접속시 html 응답하는 방법

// 미들웨어: html, css, js, img 파일들이 담긴 곳 명시
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 바디파서 미들웨어 설정
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const moment = require('moment');
const logger = (req, res, next) => {
  req.reqtime = moment().format('YYYY-MM-DD HH:mm:ss.sss');
  console.log(`------> [${req.reqtime}][${req.method}${req.url} call!]`);

  // 콘솔창에 색상을 변경해주는 이스케이브 문자를 추가해보자(마지막엔 원래 상태로)
  console.log(
    '\x1b[32m%s',
    `===========> [${req.reqtime}][${req.method}]${req.url} call!`,
    '\x1b[37m'
  );
  req.query &&
    Object.keys(req.query).length &&
    console.log(`    ====> request query = `, req.query);
  req.body &&
    Object.keys(req.body).length &&
    console.log(`     ====> request body = `, req.body);

  next(); // 미들웨어가 처리를 하고 실제 api를 호출하기 위함
};

app.use(logger); // 미들웨어 적용

const api = require('./src/api/index');
app.use('/api', api);

const http = require('http').createServer(app);
http.listen(8080, () => {
  console.log('server listen start: 8080');
});
