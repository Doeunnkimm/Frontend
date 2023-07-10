import { styled } from 'styled-components'

interface SelectItemProps {
  state: boolean
}

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 0 1.3rem;
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
  border-radius: 0.5rem;
  cursor: pointer;

  & > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  }
`

export const SelectContainer = styled.ul`
  position: absolute;
  z-index: 10;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.COLOR.common.white};
  margin-top: 0.8rem;
  padding: 0;
`

export const SelectItem = styled.li<SelectItemProps>`
  line-height: 3.5rem;
  padding: 0 1.3rem;
  font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
  color: ${({ theme, state }) => state && theme.COLOR.main};
  cursor: pointer;

  &:hover {
    transition: all 0.1s ease-in-out;
    background-color: ${({ theme }) => theme.COLOR.common.gray[500]};
  }
`
