# Commerce 프로젝트

## ⚒️ 사용 기술 스텍

- Next12
- TypeScript
- React Query
- TailwindCSS
- mantine
- Planet Scale
- Prisma
- Google OAuth

---

## 🔥 구현 과정 중 정리

1. [Notion API](https://developers.notion.com/reference/post-page)
2. [planet Scale tutorials](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
3. Prisma 연결

   - 1️⃣ prisma 설치
     ```bash
     $ yarn add -D prisma
     $ yarn add @prisma/client
     ```
   - 2️⃣ init하기
     ```bash
     $ yarn prisma init
     ```
   - 3️⃣ prisma/schema.prisma에 내용 추가
   - 4️⃣ generate 해주기

     ```bash
     $ yarn prisma generate
     ```

   - 스키마를 변경하고 싶다면 새로운 브랜치에서 add 해야한다.
   - 스키마를 변경했다면, `generate`를 한번더 해줘서 반영해준다.

4. Emotion

   - 설치
     ```bash
     $ yarn add @emotion/react @emotion/styled
     ```
   - next.config.js 설정 추가
     ```javascript
     const nextConfig = {
       compiler: {
         emotion: true,
       },
     }
     ```
   - tsconfig.json 설정 추가
     ```json
     "types": ["@emotion/react/types/css-prop"]
     ```

5. 그 밖의 스타일링 라이브러리

   - [radix-ui](https://www.radix-ui.com/)
   - [matine](https://mantine.dev/)
   - [next_ui](https://nextui.org/)
   - [material_ui](https://mui.com/)

6. react-image-gallery 라이브러리
   - [NPM](https://www.npmjs.com/package/react-image-gallery)
7. 번들 사이즈 고려
   - [bundle phohia](https://bundlephobia.com/)
   - extension: Import Cost
8. 봇(bot)에게 보이는 부분

   - robots.txt
   - meta data
   - 시맨틱 HTML

9. SEO

   - https://developers.facebook.com/docs/sharing/webmasters
   - https://react.dev/
   - og:title, og:type, og:url, og:description, og:image
   - 위 부분들은 Next가 SSR 혹은 SSG로 동작할 때 미리 그려져야지 유의미하게 bot이 긁어갈 것!

10. Editor Library

    - [draft.js](https://draftjs.org/)
    - [slate.js](https://docs.slatejs.org/)
    - [tiptap](https://tiptap.dev/)

11. next/image에 blur 효과 주기

    - [blurDataUrl\_생성](https://png-pixel.com/)

12. Pagination은 `@mantine/core`에서 제공하는 컴포넌트를 사용

13. Infinite scroll
    - 스크롤이 하단에 도달했는지 판단이 필요
    - 그 판단을 위해 scroll event를 활용할 수 있고, intersection observer를 활용할 수 있다.
    - scroll event를 활용하면 잦은 호출을 방지하기 위해 throttle을 적용하거나 requestAnimationFrame(rAF)를 활용하는 것이 좋다.
    - 무한 스크롤을 했을 경우, React에서 한 화면에 너무 많은 컴포넌트를 들고 있는 경우가 발생
    - 로드한 컴포넌트가 늘어날수록 느려지는 현상이 발생할 수 있다.
    - 그럴 때는 Virtual Scroll(가상 스크롤)을 활용할 수 있다.
    - n개의 컴포넌트만 그리고 이 요소를 재활용할 수 있도록 해준다.
14. Prisma API

    - [prisma-client/crud](https://www.prisma.io/docs/concepts/components/prisma-client/crud)
    - [prisma-client-reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

15. React Query

    - 설치
      ```bash
      $ yarn add @tanstack/react-query
      ```
    - react-query의 타입
      ```typescript
      const getData = useQuery<queyFn에서 반환된 타입, queryFn에서 예상되는 오류 타입, 최종적으로 보유하게 될 데이터 타입, queryKey의 타입>
      ```

16. [Google OAuth](https://developers.google.com/identity/protocols/oauth2?hl=ko)
    - [credentials](https://console.cloud.google.com/apis/credentials)
    - [로그인을\_위한\_라이브러리](https://github.com/MomenSherif/react-oauth#googlelogin)
    - jwt로 전달되는 google credential의 내용은 `jwt-decode`로 decode 해볼 수 있다.
17. Next.js에서는 Authentication(인증)을 어떻게 가이드?

    - [DOCS](https://nextjs.org/docs/pages/building-your-application/routing/authenticating)
    - [NextAuth.js](https://next-auth.js.org/)
    - 현재 DB는 Prisma로 통신하고 있다. 그래서 next-auth도 Prisma랑 adapting해서 사용하자
      - [DOCS](https://authjs.dev/reference/adapter/prisma)
    - 로그인에 성공하면 인증 관련 정보들이 Cookie storage에 담기게 된다.

18. Prisma DB 관련 트러블 슈팅
    - env를 계속 못찾는다
      - env("DATABASE_URL")은 `.env.local`를 못찾는다. 꼭 `.env`에서 환경변수를 관리하자.
    - `yarn prisma db push` 해도 올라가지 않는다
      - DATABASE_URL 환경변수에 브랜치 URL이 제대로 올라가 있는지 확인하자. 그 후에 `yarn prisma db push`를 해보자.
