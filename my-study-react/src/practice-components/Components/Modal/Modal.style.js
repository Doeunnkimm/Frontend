import styled, { css } from 'styled-components';

const sizeCSS = {
  small: css`
    width: 30vw;
    min-width: 433px;
    height: 200px;
    padding: 12px;
  `,
  medium: css`
    width: 30vw;
    min-width: 433px;
    height: 300px;
    padding: 12px;
  `,
  large: css`
    width: 30vw;
    min-width: 433px;
    height: 400px;
    padding: 12px;
  `,
};

export const Modal = styled.div`
  ${({ size }) => sizeCSS[size]}
  position: relative;
  padding: 20px;
  background-color: rgb(244, 244, 250);
`;

export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;
