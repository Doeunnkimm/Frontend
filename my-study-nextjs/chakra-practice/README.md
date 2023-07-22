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
