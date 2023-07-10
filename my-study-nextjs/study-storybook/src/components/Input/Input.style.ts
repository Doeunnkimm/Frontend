import { css, styled } from 'styled-components'

export const statusCSS = {
  default: css`
    border: 1px solid ${({ theme }) => theme.COLOR.common.gray[300]};
  `,
  success: css`
    border: 1px solid ${({ theme }) => theme.COLOR.success};
  `,
  error: css`
    border: 1px solid ${({ theme }) => theme.COLOR.error};
  `,
}

const colorCSS = {
  default: css`
    color: ${({ theme }) => theme.COLOR.common.gray[300]};
  `,
  success: css`
    color: ${({ theme }) => theme.COLOR.success};
  `,
  error: css`
    color: ${({ theme }) => theme.COLOR.error};
  `,
}

interface MessageProps {
  status?: keyof typeof statusCSS
}

interface InputProps extends MessageProps {
  hasIcon: boolean
}

interface LabelProps {
  hasLabel: boolean
  hasMessage: boolean
}

export const Input = styled.input<InputProps>`
  width: 100%;
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  border-radius: 0.125rem;
  background: none;
  padding: 1.3rem;
  height: 5rem;
  padding-left: ${({ hasIcon }) => hasIcon && '4.5rem'};
  ${({ status = 'default' }) => statusCSS[status]};

  &:focus {
    border-color: ${({ theme }) => theme.COLOR.main};
    box-shadow: inset 0px 0px 1px 3px ${({ theme }) => theme.COLOR.focus};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.COLOR.common.gray[100]};
    background-color: ${({ theme }) => theme.COLOR.common.gray[300]};
    opacity: 0.1;
  }
`

export const Label = styled.label<LabelProps>`
  display: block;
  position: relative;
  width: 100%;
  margin-top: ${({ hasLabel }) => (hasLabel ? '0.5rem' : '0')};
  margin-bottom: ${({ hasMessage }) => (hasMessage ? '1.625rem' : '0')};
`

export const LabelText = styled.span`
  position: absolute;
  display: inline-block;
  top: -0.375rem;
  left: 0.75rem;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  background-color: white;
  color: ${({ theme }) => theme.COLOR.common.gray[300]};
`

export const Icon = styled.div`
  position: absolute;
  display: flex;
  width: 3rem;
  left: 1rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
`

export const Message = styled.p<MessageProps>`
  ${({ status = 'default' }) => colorCSS[status]};
  font-size: 0.75rem;
  position: absolute;
  margin: 0.25rem 0.5rem;
`
