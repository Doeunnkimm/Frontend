## Yarn workspace로 모노레포 설정해보기

### yarn workspace

- `package.json`에 `workspace`에 등록하게 되면 각각의 프로젝트를 로컬 npm 패키지처럼 인식
- 즉, 하위 패키지들은 서로 참조하는 연관 관계를 가질 수 있다.
- 의존성이 공통으로 관리 → 의존성 관리가 수월
- 각각의 프로젝트(하위 패키지)에 .lock 파일, node_modules 대신에 상위의 하나에서 관리된다.

### 1. yarn init 하여 package.json 생성

```bash
$ yarn init
```

init 이후 root에 `package.json` 파일이 생성되면 아래 내용을 추가

```json
"private": true,
"workspaces": [
  "apps/*",
	"packages/*"
	],
"scripts": {
    "client": "yarn workspace client",
    "server": "yarn workspace server"
  }
```

`“private” : true` : 모노레포가 외부로 패키지처럼 배포될 수 없음을 알려주는 역할

`"workspaes": [ ... ]` : 명시된 프로젝트들을 모노레포로 사용한다는 것. 서로서로 참조

`“script” : { … }` : 프로젝트 실행을 간편하기 위해 설정

이걸 사용하면 각 프로젝트의 package.json의 script를 root에서 경로 이동 없이 바로 사용 가능.

script의 key 값인 client와 server는 그 때 사용하는 용도. 예를 들어 아래와 같이 사용 가능

```
💡 script 사용

yarn client start
yarn client add {package}
yarn client remove {package}
yarn client build
yarn client dev

yarn server start
yarn server lint
yarn server add {package}
yarn server remove {package}

```

`"dependencies"` : root에 패키지를 설치할 때는 기존의 멀티레포 방식과 동일하게 사용 가능.

`yarn add` 명령어 중간에 키워드를 사용하지 않으면 root에 자동으로 설치

설치된 패키지는 전역으로 공유되기 때문에 각 프로젝트 레벨에서 가져다 쓸 수 있다.

```bash
$ yarn add { 설치할 package명 }
```

### 2. apps/프로젝트

관리할 프로젝트를 폴더 별로 만든다.

```bash
$ yarn create next-app client --typescript
$ yarn create next-app admin --typescript
```

명령어를 입력하면 폴더에 프로젝트에 필요한 파일들이 생성되면서 루트에 `node_modules`도 함께 생성된다. 프로젝트 폴더에서 `node_modules`가 생겨서 당황했는데 루트에 있는 `node_modules` 를 참조하고 있기 때문에 삭제를 하더라도 `yarn client dev`를 하게 되면 정상 작동하는 것을 확인할 수 있었다.

### 3. 전체 프로젝트에 적용할 의존성은 루트에 add

전체 프로젝트가 모두 공유할 의존성은 루트에 add를 한다. 예를 들어 `tsconfig`, `prettier`, `eslint`, `husky` 등!

#### prettier

```bash
yarn add -W -D prettier eslint-plugin-prettier eslint-config-prettier
```

`eslint-config-prettier` : ESLint의 formatting 관련 설정 중 Prettier와 충돌하는 부분을 비활성화

`eslint-plugin-prettier` : 원하는 형식의 formatting을 설정

#### eslint

```bash
$ yarn add -W -D eslint

# eslint의 formatter을 off하고 prettier를 사용하기 위한 패키지들
$ yarn add -W -D eslint-config-prettier eslint-plugin-prettier

# typescript를 lint하기 위한 패키지들
$ yarn add -W -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# next 규칙 플러그인
$ yarn add -W -D @next/eslint-plugin-next

# airbnb 규칙
$ yarn add -W -D eslint-config-airbnb

# airbnb 규칙의 의존성 패키지들
$ yarn add -W -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

# airbnb 타입스크립트 규칙
$ yarn add -W -D eslint-config-airbnb-typescript

# jest를 규칙 플러그인
$ yarn add -W -D eslint-plugin-jest
```

`eslint-plugin-import` : ES6의 import/export syntax 체크, 파일 경로나 import 이름을 잘못 입력하는지 여부를 체크해주는 lint 플러그인

`eslint-plugin-a11y` : 리액트 element의 접근성 이슈를 짚어 lint 해주는 플러그인

`eslint-plugin-react` : 리액트 규칙들을 추가해주는 플러그인

`eslint-plugin-import` : 리액트 hooks 규칙들을 추가해주는 플러그인

`.eslintrc.json` 파일

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "unused-imports",
    "react-hooks",
    "prettier"
  ],
  "extends": [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "prettier"
  ],
  "ignorePatterns": [
    "**/build/**/*.*",
    ".yarn/**/*",
    "node_modules",
    ".pnp.*",
    ".yarnrc.yml",
    "yarn.lock"
  ],
  "rules": {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-empty-function": 0,
    "react/button-has-type": 0,
    "jsx-a11y/media-has-caption": 0,
    "import/prefer-default-export": 0, // 0 -> 0ff / 1 -> on (default)
    "prettier/prettier": 0,
    "no-alert": 0,
    "import/extensions": 0,
    "consistent-return": 1,
    "no-use-before-define": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    "no-shadow": 0,
    "react/prop-types": 0,
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": [
      2,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ],
    // redux-toolkit docs https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
    "no-param-reassign": [
      "error",
      { "props": true, "ignorePropertyModificationsFor": ["state", "ctx"] }
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "react/function-component-definition": 0,
    "react/destructuring-assignment": 0,
    "@typescript-eslint/prefer-namespace-keyword": 0,
    "jsx-a11y/anchor-is-valid": [
      // nextjs 에서 a tag 에 href 를 기대하는 이슈로 인해
      "error",
      {
        "components": ["Link"],
        "specialLink": ["hrefLeft", "hrefRight"],
        "aspects": ["invalidHref", "preferButton"]
      }
    ],
    "no-underscore-dangle": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/no-unknown-property": ["error", { "ignore": ["css"] }]
  }
}
```

`package.json` 파일에서 `script` 에 아래 내용 추가

```json
"scripts": {
    "lint": "eslint ."
},

그 후에 터미널에서 `yarn run lint`
```
