import { setupWorker } from 'msw'
import { handler } from './apis/handler'

export const worker = setupWorker(...handler)
// 이제 서비스 워커 세팅 완료
// --> 이제 app.js에 가서 구동시켜주기만 하면 됨!

/*
    🔥 MSW 순서 정리 🔥

    0. src 폴더 안에 __mock__ 파일을 생성

        (1) datas 폴더 : mock 데이터들을 관리
            이 안에는 필요한 mock 데이터를 관리하고 있다
                ex) datas/todo.data.js파일, ...

        (2) apis 폴더 : api들을 관리
            이 안에는 필요한 종류 별로 폴더를 만들어 api를 관리하기도 한다
                ex) apis/todo, apis/user, ...

            apis/handler.js 파일
                apis 폴더에서 만들어진 api들을 등록하게 되는 파일이다
                여기에는 apis 폴더에서 만들었던 api들을 키값에 상관없이 값만을 넣게 된다
                
                ex) export const handler = [...Object.values(TodoApi)];

        (3) browser.js 파일
            모든 api들이 등록되어 있는 handler 파일을 셋업하게 되는 파일이다

            ex) export const worker = setupWorker(...handler);

    
    1. npm i msw init public/
        public 폴더에 msw를 init 하는 파일을 생성한다.

            -> public/mockServiceWorker.js 파일이 생성되게 됨


    2. datas 폴더에 파일을 만들어 사용하게 될 mock 데이터를 담는다

        ex) export const todoMock = [{...}, {...}]

    3. apis 폴더에서 이제 이 mock 데이터를 요청, 응답 api를 작성해준다
        이때 msw 라이브러리의 rest라는 것을 통해 get, post, update, delete 요청 응답 api를 작성한다.

        ex) 
            export const getTodo = rest.get('/api/todo', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(todoMock)); // 응답 보낼 내용
            });

            위 코드를 해석하면
            클라이언트로부터 /api/todo 라는 url로 들어온 get 요청에 대해 다음과 같이 응답한다
                res()는 응답 부분인데,
                ctx는 응답을 보내는 것으로 이해한다

                이 안에는 ctx.status(200)       --> 200이라는 성공 status 코드
                          ctx.json(todoMock)    --> todoMock(우리가 만들었던 mock 데이터)를 json으로
                
                => 이걸 get 요청을 보낸 클라이언트에게 응답을 보내는 것!

    4. 이제 /apis/handlers에 등록
        
        ex)
            import * as TodoApi from './todo/todo.api' <-- 해당 파일에서 export한 모든 걸 다 가져옴. 통틀어서 TodoApi라고 alias

            export const handler = [...Object.values(TodoApi)]; // 키값 상관없이 값만 가지고 와서 배열에 넣음
            -> 이렇게 하게 되면 handler에는 요청에 응답하는 api들만이 다 들어가게 됨

    5. handler를 browser에 등록

        ex)
            import { setupWorker } from 'msw';

            export const worker = setupWorker(...handler);

            --> 여기까지 하면 서비스 워크 세팅 끝

    6. app.js에서 구동
        
        ex) app.js에서
            그런데 개발 모드일 때만 mock api를 사용하면 되는 것이므로

            if (process.env.NODE_ENV === 'development') {
                worker.start();
            }

*/
