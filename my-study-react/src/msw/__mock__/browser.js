import { setupWorker } from 'msw';
import { handler } from './apis/handler';

/* config 같은 파일 */
export const worker = setupWorker(...handler);

/*
    🔥 MSW 활용 순서

    0. npm i -D msw
       npx msw init public/

    1. Mock 데이터 배열을 만든다.

        ex) datas/product.data.js

            export const productMock = [{...}, {...}];
    
    2. 원하는 로직에 해당하는 api를 만든다.

        ex) apis/product/product.api.js

            export const addProduct = rest('/api/product/search', async(req, res, ctx) => {
                // 원하는 로직
                return res(
                    ctx.status(200),
                    ctx.json({...클라이언트에게 응답값으로 보내줄 데이터})
                )
            })

    3. 2에서 만든 api를 handler에 등록해준다.
        
        ex) apis/handler.js

            import * as ProductApi from './product/product.api'

            export const handler = [...Object.values(ProductApi)];

    4. 마지막으로 3에서 만든 handler를 browser에게 등록한다.

        ex) __mock__/browser.js

            export const Worker = setupWorker(...handler)
            
        -> 서비스 워크 세팅 완료 !

    5. 세팅을 다 했으니, 실제로 구동 시켜보자
            ※ 다만, 배포 환경에서는 구동 X

        ex) App.js

            if(process.env.NODE_ENV === 'development') worker.start();

*/
