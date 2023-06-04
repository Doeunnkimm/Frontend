import { useRef, useState } from 'react';
import * as S from './TextArea.styles';

function TextArea({ label, value, ...props }) {
  const ref = useRef(null);
  const [valueLength, setValueLength] = useState(0);

  const onChange = e => {
    setValueLength(ref.current.value.length ?? 0);
    props.onChange(e);
  };

  return (
    <S.Label hasLabel={!!label}>
      {label && <S.LabelText>{label}</S.LabelText>}
      <S.TextArea {...props} ref={ref} value={value} onChange={onChange} />
      <S.TextLength>
        {value.length ?? valueLength}
        {props.maxLength ? `${props.maxLength}` : ''}
      </S.TextLength>
    </S.Label>
  );
}
export default TextArea;
