import styled, { css } from 'styled-components';

const variantCSS = {
  // 키값으로 css를 분리
  primary: css`
    background: ${({ theme }) => theme.PALETTE.primary[300]};
    color: ${({ theme }) => theme.PALETTE.fontColor};
  `,

  'primary-reverse': css`
    border: 1px solid ${(theme) => theme.PALETTE.primary[300]};
    color: ${({ theme }) => theme.PALETTE.primary[300]};
  `,

  'primary-text': css`
    border: none;
    color: ${({ theme }) => theme.PALETTE.primary[300]};
  `,
};

const shapeCSS = {
  default: css``,
  shape: css`
    border-radius: 8px;
  `,
  round: css`
    border-radius: 50%;
  `,
};

const sizeCSS = {
  small: css`
    width: 64px;
    height: 32px;
    padding: 16px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  `,
  medium: css`
    width: 96px;
    height: 48px;
    padding: 16px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  `,
  large: css`
    width: 128px;
    height: 64px;
    padding: 16px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  `,
  full: css`
    width: 100%;
    aspect-ratio: 8 / 1;
    font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  `,
};

export const Button = styled.button`
  ${({ variant }) => variantCSS[variant]}
  ${({ shape }) => shapeCSS[shape]}
  ${({ size }) => sizeCSS[size]}
  cursor: pointer;
  border: none;
  :hover {
    opacity: 0.8;
  }
`;
