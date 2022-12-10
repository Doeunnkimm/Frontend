const express = require("express");
const path = require("path");
const app = express();

// 메인 페이지 접속시 html 응답하는 방법

// 미들웨어: html, css, js, img 파일들이 담긴 곳 명시
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const http = require("http").createServer(app);
http.listen(8080, () => {
  console.log("server listen start: 8080");
});
