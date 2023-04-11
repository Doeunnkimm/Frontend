import { sizeCSS } from '../Icon.style';
import IconBox from '../../IconBox/IconBox';
import { AiOutlineClose } from 'react-icons/ai';

function CloseIcon({ size, ...rest }) {
  return (
    <IconBox>
      <AiOutlineClose size={sizeCSS[size]} {...rest} />
    </IconBox>
  );
}
export default CloseIcon;
