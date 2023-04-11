import { useSetRecoilState } from 'recoil';
import Modal from '../../../../../Components/Modal/Modal';
import { ModalTitle } from '../../../../../Components/Modal/Modal.style';
import { Text } from './style';
import { isOpenModalAtom } from '../../../../../Atoms/modal.atom';

function RecentPostModal({ list, setPost }) {
  const setIsOpenModal = useSetRecoilState(isOpenModalAtom);

  const onClickRecentPost = post => {
    setPost(post);
    setIsOpenModal(false);
  };
  return (
    <Modal size={'large'}>
      <ModalTitle>최근 지역</ModalTitle>
      {list.map(post => (
        <Text onClick={() => onClickRecentPost(post)}>{post}</Text>
      ))}
    </Modal>
  );
}
export default RecentPostModal;
