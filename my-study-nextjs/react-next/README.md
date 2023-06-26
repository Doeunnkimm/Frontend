# React 프로젝트를 Next.js로 마이그레이션

1. `react-scripts` remove하기
   ```bash
   $ yarn remove react-scripts
   ```

<br>

2. `next` add하기
   ```bash
   $ yarn add next
   ```

<br>

3. `script` 명령어 변경해주기
   ```json
   "script": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
   }
   ```

<br>

4. `.gitignore`에 `next` 추가

<br>

5. static한 파일들은 모두 `public`으로 옮기기
   - logo.svg

<br>

6. root 디렉토리에 `pages` 폴더 만들기

   - 이 폴더에 `_document.js` 파일 생성하고, `index.html`의 head에 있는 내용들을 가져와 붙여준다.
   - 이 폴더에 `_app.js` 파일 생성한다.
     <br>

7. root 디렉토리에 `styles` 폴더 만들기
   - `_app.js`에 `import '../styles/global.css'`을 우선 해준다.
   - `styles` 폴더에 `global.css` 파일을 생성하고, `index.css`와 `App.css` 파일 내용 모두를 옮긴다.

<br>

8. `pages` 폴더에 `index.js` 파일을 생성
   - 기존 `App.js` 파일 내용을 그대로 이동

<br>

9. 기존 `index.js` 파일은 그냥 삭제
