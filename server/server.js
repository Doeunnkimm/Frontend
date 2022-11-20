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
