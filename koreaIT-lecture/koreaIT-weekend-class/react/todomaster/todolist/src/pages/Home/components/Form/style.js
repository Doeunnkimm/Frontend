const { default: styled } = require('styled-components');
const { flexCenter } = require('styles/common');

export const Form = styled.form`
  width: 360px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  ${flexCenter};
  flex-direction: column;
  padding: 32px 0 0 0;
`;

export const InputBox = styled.div`
  width: 80%;
  height: 48px;
  ${flexCenter};
  position: relative;
  margin-bottom: 16px;

  & input {
    width: 100%;
    border: 1px solid #999;
    border-radius: 5px;
    height: 100%;
    text-align: center;
  }

  & span {
    position: absolute;
    left: 15px;
    top: -5px;
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    background-color: ${({ theme }) => theme.PALETTE.white};
    z-index: 1;
    padding: 0 5px;
  }
`;
