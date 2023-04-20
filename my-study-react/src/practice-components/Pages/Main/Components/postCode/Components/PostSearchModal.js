import Modal from '../../../../../Components/Modal/Modal';
import { ModalTitle } from '../../../../../Components/Modal/Modal.style';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom';

axios.defaults.headers.common['Accept-Language'] = 'ko-KR';

function PostSearchModal({ setPost, onAddRecentPost }) {
  const setIsOpenModal = useSetRecoilState(isOpenModalAtom);

  const onSearch = data => {
    const jibun = data.jibunAddress.split(' ').slice(0, 3).join(' ');
    setPost(jibun);
    onAddRecentPost(jibun);
    setIsOpenModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Modal size={'large'}>
      <ModalTitle>주소 검색</ModalTitle>
      <DaumPostcode onComplete={onSearch} />
    </Modal>
  );
}
export default PostSearchModal;
