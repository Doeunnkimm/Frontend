import React, { useState } from 'react';

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const CustomSelect: React.FC<SelectProps> = ({
  onChange,
  children,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    onChange && onChange(e);
  };
  return (
    <select value={selectedValue} onChange={handleChange} {...rest}></select>
  );
};
export default CustomSelect;
