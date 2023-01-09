const express = require('express');
const router = express.Router();
const mysql = require('./mysql');

// /api/login POST 데이터를 전달 받는다.
router.post('/login', async (req, res) => {
  // POST -> body !!!!!!
  console.log(req.body);
  const { userid, password } = req.body;

  const results = await mysql.findUser(req.body);
  console.log(results);

  if (results && results.length > 0) {
    // 입력한 정보가 DB에 있다면
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'fail' });
  }
});

// /api/regist POST 데이터를 전달 받는다.
router.post('/regist', async (req, res) => {
  console.log(req.body);

  // 사용자 아이디 중복 체크(=DB에 이미 있는 아이디로 회원가입을 시도하려할 때)
  const user = await mysql.checkUser(req.body);
  console.log(user);
  if (user) {
    // 중복 O
    res.send({ result: 'dup-userid' });
  } else {
    // 중복 X
    const result = await mysql.insertUser(req.body);
    console.log(result);

    if (result) {
      res.send({ result: 'success' });
    } else {
      res.send({ result: 'fail' });
    }
  }
});

router.get('/identify', async (req, res) => {
  console.log(req.query);
  const { email } = req.query; // 입력받은 이메일이 됨

  const user = await mysql.findAccountid({ email: email }); // 받은 이메일을 데베로 넘겨서 받음
  // 만약 user = null이 되면 아래에서 에러가 생김
  console.log(user);

  if (user) {
    // user에 값이 제대로 들어오게 되면
    res.send({ result: user.userId });
  } else {
    res.send({ result: 'fail', text: '계정이 존재하지 않습니다.' });
  }
});

router.delete('/user', async (req, res) => {
  const { email, userid } = req.query;

  const result = await mysql.deleteUser(req.query);
  console.log(result);

  if (result) {
    // result === true
    res.send({ result: 'success' });
  } else {
    res.send({ result: 'fail' });
  }
});

// const array = [
//   {
//     no: 1,
//     title: '에듀윌',
//     subtitle: '🚨기간한정 특별 이벤트🚨 초시생 필수템, 만화입문서 무료배포!',
//     tags: '#합격자수1위 #에듀윌 #공인중개사',
//     url: 'EDUWILL.NET',
//     text: '입문교재 선착순 무료신청☞ 합격자 수 1위 에듀윌 공인중개사',
//     image: '/images/game-1.jpg',
//     likecount: 1,
//   },
//   {
//     no: 2,
//     title: '코리아 IT',
//     subtitle: '🚨기간한정 특별 이벤트🚨 프론트엔드 5개월 차 수업',
//     tags: '#합격자수1위 #코리아IT #프론트엔드',
//     url: 'KOREAIT.NET',
//     text: '녹화 동영상 무료 제공! ☞ 합격자 수 1위 에듀윌 공인중개사',
//     image: '/images/game-2.jpg',
//     likecount: 1,
//   },
//   {
//     no: 3,
//     title: '코리아 IT',
//     subtitle: '🚨기간한정 특별 이벤트🚨 프론트엔드 5개월 차 수업',
//     tags: '#합격자수1위 #코리아IT #프론트엔드',
//     url: 'KOREAIT.NET',
//     text: '녹화 동영상 무료 제공! ☞ 합격자 수 1위 에듀윌 공인중개사',
//     image: '/images/game-3.jpg',
//     likecount: 1,
//   },
// ];

router.get('/home', async (req, res) => {
  console.log(req.query);

  const array = await mysql.selectHome();
  console.log(array);

  res.send({ result: array });
});

router.put('/home/like', async (req, res) => {
  console.log(req.body);

  // const { no, like } = req.body;

  // 1. likecount를 업데이트 하는 코드
  await mysql.updateLike(req.body);
  // 2. 업데이트한 데이터를 셀렉트(가져오는) 코드
  const item = await mysql.findHome(req.body);

  res.send({ result: item });
});

module.exports = router;
