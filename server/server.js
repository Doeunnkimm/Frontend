const express = require("express");
const path = require("path");
const app = express();

// 메인페이지 접속시 html 응답하는 방법

// 미들웨어 : html, css, js, img 파일들이 담긴 곳 명시
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// /hello 접속했을 때 hello.html을 보여주고 싶다
// "/helo"를 요청했을 때 res....<- 응답해줄 내용
// app.get("/hello", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/hello.html"));
// });

// app.get("/hello/test", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/test.html"));
// });

// 조회
app.get("/api/hello", (req, res) => {
  console.log("-------------------->  /api/hello call!!!");
  console.log("서버에서 데이터를 가져온다.");
  res.send("[GET] 서버에서 데이터를 가져온다.");
});

// 삽입
app.post("/api/hello", (req, res) => {
  console.log("-------------------->  /api/hello call!!!");
  console.log("서버에서 데이터를 삽입한다.");
  res.send("[POST] 서버에서 데이터를 삽입한다.");
});

// 삭제
app.delete("/api/hello", (req, res) => {
  console.log("-------------------->  /api/hello call!!!");
  console.log("서버에서 데이터를 삭제한다.");
  res.send("[DELETE] 서버에서 데이터를 삭제한다.");
});

// 수정
app.put("/api/hello", (req, res) => {
  console.log("-------------------->  /api/hello call!!!");
  console.log("서버에서 데이터를 수정한다.");
  res.send("[PUT] 서버에서 데이터를 수정한다.");
});

const http = require("http").createServer(app);

app.listen(8080, () => {
  console.log("start! express server!");
});

// module(시작을 소문자..)로 하면 실행 되지 않았음
// const Module = require("./src/Day04/module.js");
// console.log(Module.add(1, 2));
// console.log(Module.sub(2, 1));
// console.log(Module.mul(3, 4));
// console.log(Module.add(10, 2));

// 내장 모듈 불러오기
// const System = require("./src/Day04/system");
// System.info();
// System.path();

// const Moment = require("./src/Day04/moment");
// Moment.today();
// Moment.date();
// Moment.format();
// Moment.add();
// Moment.diff();

// const ConsoleExam = require("./src/Day05/consoleExam");
// ConsoleExam.time();
// ConsoleExam.table();
// ConsoleExam.log();
// ConsoleExam.dir();
// ConsoleExam.rest();

const TimerExam = require("./src/Day05/timer");
// TimerExam.timeout();
// TimerExam.interval();
// TimerExam.clear();
// TimerExam.counter();
TimerExam.downcounter();
