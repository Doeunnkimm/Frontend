import styled, { css } from 'styled-components';

const variantCSS = {
  primary: css`
    background-color: gray;
    color: white;
    border: none;

    &:disabled {
      background-color: rgb(220, 220, 220);
    }
  `,
  inverse: css`
    color: gray;
    border: 1px solid gray;
    background: none;

    &:disabled {
      color: rgb(220, 220, 220);
      border: 1px solid gray;
    }
  `,
  'primary-text': css`
    background: none;
    border: none;
    color: gray;
  `,
  text: css`
    background: none;
    border: 1px solid gray;
  `,
  default: css`
    background-color: white;
    border: 1px solid gray;

    &:disabled {
      color: gray;
      border: 1px solid gray;
    }
  `,
};

const shapeCSS = {
  default: css`
    border-radius: 0.125rem;
  `,
  round: css`
    border-radius: 3rem;
  `,
};

const sizeCSS = {
  dense: css`
    padding: 0, 0.5rem;
  `,
  small: css`
    padding: 0.25rem 0.25rem;
  `,
  medium: css`
    font-size: 1rem;
    padding: 0.625rem 0.625rem;
  `,
  large: css`
    font-size: 1.25rem;
    padding: 1.25rem;
    font-weight: 700;
  `,
};

export const Button = styled.button`
  ${({ variant }) => variantCSS[variant]};
  ${({ shape }) => shapeCSS[shape]};
  ${({ size }) => sizeCSS[size]};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
