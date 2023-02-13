// node_modules의 express 패키지를 가져온다.
var express = require("express");

// app이라는 변수에 express 함수의 값을 저장한다.
var app = express();

// 환경변수에서 port를 가져온다. 그러나 환경변수 값이 없으면 5050 포트를 지정한다.
var port = app.listen(process.env.PORT || 5050);

// REST API의 한가지 종류인 GER request를 정의하는 부분
// app.get이라고 작성했기 때문에 get 요청으로 정의가 되고
// app.post로 작성할 경우 post 요청으로 정의가 된다.
// REST API의 종류(get, post, put, delete 등)을 사용하여 end point를 작성할 수 있다.
app.get("/", (req, res) => {
  console.log("/ 루트로 요청이 왔습니다."); // 접속할 때마다 서버의 터미널에 출력
  // 요청에 대한 응답
  res.send("<h1>Express server Start!</h1>");
});

// express 서버를 실행할 대 필요한 포트 정의 및 실행시 callback 함수를 받는다.
// 입력해준 port로 실행할테니까 실행 다 되면 다음 함수를 호출할게!
app.listen(port, () => {
  console.log("start! express server!");
});
