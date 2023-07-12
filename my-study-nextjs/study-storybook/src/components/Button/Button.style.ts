import styled, { css } from 'styled-components'

export default interface ButtonProps {
  variant: keyof typeof variantCSS
  shape: keyof typeof shapeCSS
  size: keyof typeof sizeCSS
  fontSize: keyof typeof fontSizeCSS
  disabled: boolean
}

const variantCSS = {
  default: css`
    background-color: ${({ theme }) => theme.COLOR.main};
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => theme.COLOR.sub};
      transition: all 0.2s ease-in-out;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.COLOR.common.gray[400]};
    }
  `,
  'default-reverse': css`
    border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
    background-color: ${({ theme }) => theme.COLOR.common.white};
    font-weight: bold;

    &:hover {
      background-color: ${({ theme }) => theme.COLOR.sub};
      transition: all 0.2s ease-in-out;
    }
  `,
}

const shapeCSS = {
  default: css`
    border-radius: 1rem;
  `,
  round: css`
    border-radius: 2.2rem;
  `,
  square: css`
    border-radius: 0rem;
  `,
}

const sizeCSS = {
  default: css`
    width: 16rem;
    height: 4.8rem;
  `,

  full: css`
    width: 100%;
    height: 4.8rem;
  `,
  fit: css`
    width: fit-content;
    height: fit-content;
    padding: 0.3rem 1.5rem;
  `,
}

const fontSizeCSS = {
  default: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
  `,
  tiny: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  `,
  medium: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  `,
  large: css`
    font-size: ${({ theme }) => theme.FONT_SIZE.large};
  `,
}

export const Button = styled.button<ButtonProps>`
  ${({ variant }) => variantCSS[variant]};
  ${({ shape }) => shapeCSS[shape]};
  ${({ size }) => sizeCSS[size]};
  ${({ fontSize }) => fontSizeCSS[fontSize]};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
