const express = require('express');
const router = express.Router();
const mysql = require('./mysql');

// /api/login POST 데이터를 전달 받는다.
router.post('/login', (req, res) => {
  // POST -> body !!!!!!
  console.log(req.body);
  const { userid, password } = req.body;

  mysql.selectUsers('', (result) => {
    console.log(result);
  });

  if (userid === 'doeunn' && password === '1234') {
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'fail' });
  }
});

// /api/regist POST 데이터를 전달 받는다.
router.post('/regist', (req, res) => {
  console.log(req.body);

  const { name, userid, password, year, month, day, gender } = req.body;

  if (name && userid && password && month && day && gender) {
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'fail' });
  }
});

router.get('/identify', (req, res) => {
  console.log(req.query);
  const { email } = req.query;

  if (email === 'doeunnkimm@gmail.com') {
    res.send({ result: 'doeunnkimm' });
  } else if (email === 'aaa123@email.com') {
    res.send({ result: 'aaa123' });
  } else {
    res.send({ result: 'fail', text: '계정이 존재하지 않습니다.' });
  }
});

router.delete('/user', (req, res) => {
  const { email, userid } = req.query;

  if (email === 'doeunnkimm@gmail.com' && userid === 'doeunnkimm') {
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'fail' });
  }
});

const array = [
  {
    no: 1,
    title: '에듀윌',
    subtitle: '🚨기간한정 특별 이벤트🚨 초시생 필수템, 만화입문서 무료배포!',
    tags: '#합격자수1위 #에듀윌 #공인중개사',
    url: 'EDUWILL.NET',
    text: '입문교재 선착순 무료신청☞ 합격자 수 1위 에듀윌 공인중개사',
    image: '/images/game-1.jpg',
    likecount: 1,
  },
  {
    no: 2,
    title: '코리아 IT',
    subtitle: '🚨기간한정 특별 이벤트🚨 프론트엔드 5개월 차 수업',
    tags: '#합격자수1위 #코리아IT #프론트엔드',
    url: 'KOREAIT.NET',
    text: '녹화 동영상 무료 제공! ☞ 합격자 수 1위 에듀윌 공인중개사',
    image: '/images/game-2.jpg',
    likecount: 1,
  },
  {
    no: 3,
    title: '코리아 IT',
    subtitle: '🚨기간한정 특별 이벤트🚨 프론트엔드 5개월 차 수업',
    tags: '#합격자수1위 #코리아IT #프론트엔드',
    url: 'KOREAIT.NET',
    text: '녹화 동영상 무료 제공! ☞ 합격자 수 1위 에듀윌 공인중개사',
    image: '/images/game-3.jpg',
    likecount: 1,
  },
];

router.get('/home', (req, res) => {
  console.log(req.query);

  res.send({ result: array });
});

router.put('/home/like', (req, res) => {
  console.log(req.body);

  const { no, like } = req.body;

  // 내가 받은 번호랑 같다면 반환하자
  const data = array.find((item) => item.no === no);
  data.likecount = Number(data.likecount) + Number(like);

  console.log(array);

  res.send({ result: 'success' });
});

module.exports = router;
