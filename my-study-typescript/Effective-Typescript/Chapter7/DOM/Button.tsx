import React, { useState } from 'react';

// interface ButtonProp {
//   onClick: () => void;
//   children: React.ReactNode;
// }

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  ...rest
}) => {
  const [clickCount, setClickCount] = useState(0); // number로 추론되고 있음

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    setClickCount(prev => prev + 1);
  };

  return <button onClick={handleClick}>{children}</button>;
};

export default CustomButton;
