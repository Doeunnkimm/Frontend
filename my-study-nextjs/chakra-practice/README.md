# Chakra UI 연습

## 공식 문서

https://chakra-ui.com/

### 1. install

```bash
$ yarn add @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion
```

### 2. provider setting

📜 app/provider.tsx

```tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  )
}

export default Provider
```

📜 app/layout.tsx

```tsx
...
return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
)
```

### (3). Customizing theme

📜 styles/chakra.theme.ts

```ts
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })
```

📜 app/provider.tsx

```tsx
...
return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
)
```

# FontAwesome 아이콘 사이즈 문제

새로고침 시 아이콘이 굉장히 커졌다가 잠시후 설정한 크기로 돌아가는 문제가 발생했다.

아래와 같이 config해주면 해결된다.

📜 app/layout.tsx

```tsx
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
```

2번째 줄은 Next.js를 사용하면 파일에서 직접 CSS를 가져올 수 있는데 이 작업을 수행하는 데 필요한 모든 Webpack 구성 및 최적화를 처리하는 코드이다. 3번째 줄은 `config.autoAddCss` 의 설정값을 false로 하여 `Font Awesome core SVG library`가 각 페이지별 <head> 태그 안에 <style>를 변경하지 않도록 해준다.
