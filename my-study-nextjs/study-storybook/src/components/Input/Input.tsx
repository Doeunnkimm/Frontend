import * as S from './Input.style'

import { FC, InputHTMLAttributes, ReactNode, forwardRef } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  label?: string
  message?: string
  status?: 'default' | 'success' | 'error'
}

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ icon, label, status = 'default', message, ...rest }, ref) => {
    return (
      <S.Label
        hasMessage={!!message}
        hasLabel={!!label}>
        {icon && <S.Icon>{icon}</S.Icon>}
        {label && <S.LabelText>{label}</S.LabelText>}
        <S.Input
          ref={ref}
          status={status}
          hasIcon={!!icon}
          {...rest}
        />
        {message && <S.Message status={status}>{message}</S.Message>}
      </S.Label>
    )
  }
)
Input.displayName = 'Input'
export default Input
