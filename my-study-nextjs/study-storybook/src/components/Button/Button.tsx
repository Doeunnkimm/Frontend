import { ButtonHTMLAttributes, FC } from 'react'
import ButtonProps, * as S from './Button.style'

interface ButtonElementProp extends ButtonHTMLAttributes<HTMLButtonElement> {}
type Props = Partial<ButtonElementProp & Omit<ButtonProps, 'disabled'>>

const Button: FC<Props> = (props) => {
  const {
    variant = 'default',
    shape = 'default',
    size = 'default',
    fontSize = 'default',
    children,
    ...rest
  } = props

  return (
    <S.Button
      variant={variant}
      shape={shape}
      size={size}
      fontSize={fontSize}
      disabled={!!rest.disabled}
      {...rest}>
      {children}
    </S.Button>
  )
}
export default Button
