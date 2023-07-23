'use client'

import { Flex, Heading } from '@chakra-ui/react'

import Image from 'next/image'

export default function Home() {
  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      pt='2rem'>
      <Heading as='h1'>chakra UI 연습</Heading>
      <Image
        src='https://chakra-ui.com/og-image.png'
        alt='chakra-logo'
        width='800'
        height='100'
      />
    </Flex>
  )
}
