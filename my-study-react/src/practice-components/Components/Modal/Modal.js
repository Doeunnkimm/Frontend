import styled from 'styled-components';
import * as S from './Modal.style';
import CloseIcon from '../Icons/close-icon/CloseIcon';
import { useSetRecoilState } from 'recoil';
import { isOpenModalAtom } from '../../Atoms/modal.atom';

function Modal(props) {
  const { size, children, ...rest } = props;
  const setIsOpenModal = useSetRecoilState(isOpenModalAtom);

  const onClickCloseModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Wrapper>
      <S.Modal className="Container" size={size} {...rest}>
        {children}
        <CloseIcon
          onClick={onClickCloseModal}
          size={'medium'}
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        />
      </S.Modal>
    </Wrapper>
  );
}
export default Modal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
