import { FormLabel, Input, InputProps } from '@chakra-ui/react'
import { ForwardRefRenderFunction, forwardRef } from 'react'

interface Props extends InputProps {
  label?: string
  error?: boolean
  type?: 'text' | 'password'
}

const CustomInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error = false, type = 'text', ...rest },
  ref
) => {
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        ref={ref}
        type={type}
        focusBorderColor='brand.600'
        isInvalid={error}
        errorBorderColor='error'
        {...rest}
      />
    </>
  )
}

export default forwardRef(CustomInput)
