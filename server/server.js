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
app.get("/hello", (req, res) => {
  res.sendFile(path.join(__dirname, "public/hello.html"));
});

app.get("/hello/test", (req, res) => {
  res.sendFile(path.join(__dirname, "public/test.html"));
});

const http = require("http").createServer(app);

app.listen(5050, () => {
  console.log("start! express server!");
});
