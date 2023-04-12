import React, { CSSProperties, PropsWithChildren } from 'react';
import * as S from './Button.style';

export interface SYButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // button 태그가 가지고 있는 모든 속성을 상속 받을 수 있음
  variant: 'primary' | 'primary-text';
  shape: 'round' | 'default';
  size: 'small' | 'medium' | 'large' | 'full';
  containerStyle?: CSSProperties; // 어떤 타입인지 모르는 상황 => 일부로 틀린다 => 타입 추천을 받는다 => 70%
  // children: React.ReactNode; // 원래는 이렇게 하는데 string이라던가 node가 아닐 수 있어서 아래와 같이 작성
  // onClick --- X
}

// function

// arrow
const SYButton: React.FC<PropsWithChildren<SYButtonProps>> = ({
  variant,
  shape,
  size,
  children,
  containerStyle,
  ...rest
}) => {
  return (
    <div style={containerStyle}>
      {/* styled components에 props로 전달하면 해당 styled에 props type을 주어야만 한다 */}
      <S.Button variant={variant} shape={shape} size={size}>
        {children}
      </S.Button>
    </div>
  );
};
export default SYButton;
