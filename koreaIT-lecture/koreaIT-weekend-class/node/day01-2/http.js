const http = require('http');

/*

    import, export (ES Modules)
    require, module.exports (CommonJS)

    ESM 최신버전
    import, export가 읽고 쓰는 속도가 더 빠름

    이전까지는 nodeJS를 통째로 ESM으로 바꾸기는 사실상 불가능이었찌만
    현재로서는 많이 개선되어 import, export를 사용하기도 한다.

    방법은 package.json에 type="module" 추가하면 끝
    하지만 모든 라이브러리와 호환이 되는 것이 아니기 떄문에 아직까지는 완벽하지는 않다.
    
*/

const server = http.createServer((req, res) => {
  res.end(
    `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HTTP 모듈 테스트</title>
        </head>
        <body>
            <h2>HTTP 모듈 테스트</h2>
            <p>처음으로 실행하는 node.js http 서버</p>
        </body>
        </html>
        `
  );
});

server.listen(3000, () => {
  console.log('3000번 포트로 실행중');
});
