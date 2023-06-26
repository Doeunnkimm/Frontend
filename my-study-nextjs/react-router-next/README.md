# React Router 프로젝트를 Next.js로 마이그레이션

1. `react-scripts` remove하기
   ```bash
   $ yarn remove react-script
   ```

<br>

2. `react-router-dom` remove하기

   ```bash
   $ yarn remove react-router-dom
   ```

   <br>

3. `next` add하기
   ```bash
   $ yarn add next
   ```

<br>

4. `scripts`에서 명령 변경
   ```json
   "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
   }
   ```
