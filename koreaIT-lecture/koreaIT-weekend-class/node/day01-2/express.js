const express = require('express');
const app = express();
const morgan = require('morgan');
app.set('port', 3000); // 키와 value를 설정한 것과 같음

// 미들웨어
// morgan: Log 미들웨어
// dev, combined, common, short, tiny
app.use(morgan('dev'));
app.use(express.json()); // json 데이터를 읽는 것을 허용
// url에 있는 정보(params) 정보를 해석할 때 express 내부에 있는 모듈만 사용할 것인지
// 만약 false라면 추가 라이브러리가 아닌 내장 모듈로만 해당 주소 값을 해석
app.use(express.urlencoded({ extended: false }));

// 라우팅
app.get('/todo/:todoId', (req, res) => {
  console.log(req.params.todoId);
  res.send('Hello Express!!!!');
});

app.get('/todos', (req, res) => {
  console.log(req.query.todoId);
  console.log(req.query.page);
  res.send('Hello Todos!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}으로 서버 실행 중`);
});
