import styled from 'styled-components';

export const Label = styled.span`
  position: absolute;
  display: inline-block;
  top: -0.375rem;
  left: 0.75rem;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  background-color: white;
  color: gray;
`;

export const LabelText = styled.span`
  position: absolute;
  display: inline-block;
  top: -0.375rem;
  left: 0.75rem;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  background-color: white;
  color: gray;
`;

export const TextAreaWrapper = styled.div``;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid gray;
  border-radius: 0.125rem;
  background: none;
  outline: none;
  resize: none;

  &:focus {
    border-color: pink;
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.8);
  }

  &:disabled {
    background-color: gray;
    opacity: 0.6;
    color: gray;
  }
`;

export const TextLength = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  color: gray;
  font-size: 0.75rem;
  margin: 0.75rem;
`;
