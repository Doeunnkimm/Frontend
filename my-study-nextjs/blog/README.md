### 프로젝트 생성

```bash
yarn create next-app blog --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

### Assets, Metadata, and CSS

- [DOCS](https://nextjs.org/learn/basics/assets-metadata-css/polishing-layout)

### Pre-render and Data Fetching

- [DOCS](https://nextjs.org/learn/basics/data-fetching/implement-getstaticprops)

### Dynamic Routes

- [getAllPostIds](https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticpaths)
- [getPostData](https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops)
- [getPostData함수\_확장](https://nextjs.org/learn/basics/dynamic-routes/render-markdown)
- [polishing](https://nextjs.org/learn/basics/dynamic-routes/polishing-index-page)

### tailwind CSS with Next

- [DOCS](https://tailwindcss.com/docs/guides/nextjs)
- install
  ```bash
   $ yarn add -D tailwindcss postcss autoprefixer
  ```
- setup

  ```bash
  $ npx tailwindcss init -p
  ```

### free svg

- [SITE](https://www.iconpacks.net/)

### md + jsx => mdx

- [DOCS](https://mdxjs.com)
- [Next.js로\_MDX\_활용](https://nextjs.org/docs/pages/building-your-application/configuring/mdx)
- install
  ```bash
  $ yarn add next-mdx-remote react-syntax-highlighter
  ```

### next-sitemap

- [NPM](https://www.npmjs.com/package/next-sitemap)

### 댓글 기능

- [DOCS](https://utteranc.es/)
- github public repository 필요
- github의 issues와 comments를 활용하기 때문에
- github 마켓플레이스에서 utterances 설치
  - [설치하러가기](https://github.com/marketplace)

### ESLint 적용하기

- install
  ```bash
  $ yarn add -D eslint
  ```
- init
  ```bash
  $ yarn eslint --init
  ```
- `yarn build`를 해보면 정말 문제가 없는지 알 수 있다.
- 이 상태로 서비스를 배포한다면?
  - tailwindCSS가 적용되지 않을 수 있다.
  - 우리가 사용하는 도구에 맞는 eslint 룰을 추가해줘야 한다.
  - tailwind를 위한 eslint plugin
    ```bash
    $ yarn add -D eslint-plugin-tailwindcss
    ```
  - 그리고 `eslintrc.json` 파일에서 `plugins`에 "tailwindcss"를 추가
  - next를 위한 eslint도 잡아주는 plugin 추가
    ```bash
    $ yarn add -D @next/eslint-plugin-next
    ```
