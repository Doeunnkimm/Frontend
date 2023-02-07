import styled from 'styled-components';

function Button(props) {
  const {text, ...rest} = props;
  return (
    <div>
      <Btn {...rest}>{text}</Btn>
    </div>
  );
}

// function Button(props) {
//   const {color, width, border, text} = props;
//   return (
//     <div>
//       <Btn color={color} width={width} border={border}>
//         {text}
//       </Btn>
//     </div>
//   );
// }

export default Button;

const Btn = styled.button`
  background-color: ${({color}) => color};
  width: ${({width}) => width};
  border: ${({border}) => border};
`;
