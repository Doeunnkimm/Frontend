import { useState, useRef, useEffect } from 'react';
/**
 * React.DetailedHTMLProps는 두 가지 제네릭 인자를 받는다.
 * 첫 번째 인자 -> HTML 요소의 속성들
 * 두 번째 인자 -> 그 요소
 *
 * 사용한 이유
 * HTML 요소의 속성들을 정확하게 타입 지원을 제공하기 위해
 * 모든 HTML 요소(예: input, div, button 등)에 대해 자동으로 가장 적절한 속성들을 사용할 수 있게 한다.
 */
type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const useInput = (initialValue: string): [string, InputProps] => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputProps: InputProps = {
    ref: inputRef,
    onChange: handleChange,
    value: value,
  };
  return [value, inputProps];
};

export default useInput;
