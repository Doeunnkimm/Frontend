import { Box, BoxProps } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

export const BorderBox: FC<Props> = ({ children, ...rest }) => {
  return (
    <Box
      min-height='100%'
      border='1px solid'
      borderColor='gray.300'
      borderRadius='6px'
      display='flex'
      alignItems='center'
      {...rest}>
      {children}
    </Box>
  )
}
