'use client'

import { Box, Button, Flex, FormControl, Heading } from '@chakra-ui/react'

import CustomInput from '../../components/Input/Input'

const Write = () => {
  return (
    <Flex
      width='full'
      alignItems='center'
      justify='center'
      direction='column'>
      <Heading
        as='h1'
        mt='3rem'>
        회원가입
      </Heading>
      <FormControl width='30%'>
        <CustomInput
          label='이메일'
          mb='1rem'
        />
        <CustomInput
          label='비밀번호'
          type='password'
          mb='1rem'
        />
        <CustomInput
          label='비밀번호 확인'
          type='password'
          mb='1rem'
        />
        <Box textAlign='center'>
          <Button
            bg='brand.600'
            variant='solid'>
            SUBMIT
          </Button>
        </Box>
      </FormControl>
    </Flex>
  )
}

export default Write
