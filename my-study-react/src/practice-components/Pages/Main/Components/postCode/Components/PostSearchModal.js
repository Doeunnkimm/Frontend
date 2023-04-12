import styled from 'styled-components';
import Modal from '../../../../../Components/Modal/Modal';
import { ModalTitle } from '../../../../../Components/Modal/Modal.style';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.headers.common['Accept-Language'] = 'ko-KR';

function PostSearchModal() {
  const [search, setSearch] = useState('');

  const onSearch = async () => {
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          search
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_API_KEY}`,
          },
        }
      )
      .then(res => console.log(res));
  };
  return (
    <Modal size={'large'}>
      <ModalTitle>주소 검색</ModalTitle>
      <input onChange={e => setSearch(e.target.value)} />
      <button onClick={onSearch}>검색</button>
    </Modal>
  );
}
export default PostSearchModal;
