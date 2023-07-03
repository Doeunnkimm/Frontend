# Commerce 프로젝트

## ⚒️ 사용 기술 스텍

- Next12
- TypeScript
- Planet Scale
- Prisma

---

## 🔥 구현 과정 중 정리

1. [Notion API](https://developers.notion.com/reference/post-page)
2. [planet Scale tutorials](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
3. Prisma 연결

   - 1️⃣ prisma 설치
     ```bash
     🏃‍♂️   $ yarn add -D prisma
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
