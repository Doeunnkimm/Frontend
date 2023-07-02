# Commerce 프로젝트

## ⚒️ 사용 기술 스텍

- Next12
- TypeScript
- Planet Scale
- Prisma

---

## 🏃‍♂️ 구현 과정 중 정리

1. [planet Scale tutorials](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide)
2. Prisma 연결

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
