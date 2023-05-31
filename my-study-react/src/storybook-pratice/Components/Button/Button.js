import * as Styled from './Button.styles';

const Button = ({
  variant = 'default',
  shape = 'default',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <Styled.Button
      variant={variant}
      shape={shape}
      size={size}
      fullWidth={fullWidth}
      disabled={!!props.disabled}
      {...props}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
