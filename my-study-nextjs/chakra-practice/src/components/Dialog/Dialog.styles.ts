import styled from '@emotion/styled'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`

export const Container = styled.div`
  z-index: 2;
  background-color: white;
  width: 22rem;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  position: relative;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 3.5rem;
  font-weight: bold;
`

export const Text = styled.div`
  max-width: 100%;
  white-space: normal;
  padding: 1rem 2rem 2rem;
`
