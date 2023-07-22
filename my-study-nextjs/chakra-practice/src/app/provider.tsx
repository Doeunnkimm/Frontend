'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { theme } from '../styles/chakra.theme'

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}

export default Provider
