# PnP(Plug’n’play) System

- Yarn berry는 위에서 언급한 문제를 Plug’n’Play 전략을 이용하여 해결한다.

## Plug’n’Play의 배경

- yarn v1은 package.json 파일을 기반으로 의존성 트리를 생성하고,
  디스크에 node_modules 디렉토리 구조를 만든다.
- 위에서 언급한 유령 의존성 때문에 node_modules 파일 시스템을 이용한 의존성 관리를 깨지 쉽다.

→ 좀 더 근본적으로 **안전하게 의존성을 관리**하는 방법은 없을까?

## Plug’n’Play 시작하기

1. 기존의 npm 기반으로 되어 있는 의존성 관리들을 remove

   ```bash
   프로젝트가 create 되어 있고

   $ rm -rf node_modules
   $ rm -rf package.lock.json
   ```

2. berry 버전으로 set 후 install

   ```bash
   y$ yarn set version berry
   $ yarn install
   ```

   그러면 node_modules가 생성된다.

3. `.yarnrc.yml` 에서 nodeLinker 수정

   ```
   nodeLinker: pnp
   yarnPath: .yarn/releases/yarn-3.6.1.cjs
   ```

   위 내용으로 수정하고 `yarn intsall` 한번더

   그러면 node_moduels가 제거되면서 `.yarn` 폴더에 `install-state.gz` 생성

4. `.gitignore` 내용 추가 (zero intsall)

   ```
   .yarn/*
   !.yarn/cache
   !.yarn/patches
   !.yarn/plugins
   !.yarn/releases
   !.yarn/sdks
   !.yarn/versions
   ```

5. extension 설치

   불러오는 모든 module들이 에러를 뿜고 있다면 extension(ZipFS)을 설치한다.

   그리고 아래 커맨드를 터미널에 입력한다.

   ```bash
   $ yarn dlx @yarnpkg/sdks vscode
   ```

   설치 후 모달이 뜨면 Allow 해준다. 만약 모달이 뜨지 않는다면 `command+P` 를 누르고 `>Typescript version` 을 입력하고 **작업 영역 버전 사용**을 선택한다.
