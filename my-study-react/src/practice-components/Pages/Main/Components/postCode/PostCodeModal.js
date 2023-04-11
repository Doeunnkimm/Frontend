import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import useCurrentLocation from '../../../../Hooks/useCurrentPosition';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isOpenModalAtom } from '../../../../Atoms/modal.atom';
import RecentPostModal from './Components/RecentPostModal';
import PostSearchModal from './Components/PostSearchModal';

function PostCode() {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom);
  const [type, setType] = useState('');
  const [post, setPost] = useState('');
  const recentPostList =
    JSON.parse(localStorage.getItem('recentPosts')) === null
      ? []
      : [...JSON.parse(localStorage.getItem('recentPosts'))];

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);

  const onClickGetCurrentLocation = async () => {
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${currentLocation.longitude}&y=${currentLocation.latitude}&input_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_API_KEY}`,
          },
        }
      )
      .then(res => {
        const { address } = res.data.documents[0];
        const recentPost = `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`;
        setPost(recentPost);
        localStorage.setItem(
          'recentPosts',
          JSON.stringify(
            recentPostList !== null
              ? [recentPost]
              : [recentPost, ...recentPostList]
          )
        );
      });
  };

  console.log(recentPostList);
  const onClickNoPost = () => setPost('지역설정안함');

  const onShowModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = 'hidden';
  };

  const onClickRecentPosts = () => {
    onShowModal();
    setType('recent');
  };

  const onClickPostSearch = () => {
    onShowModal();
    setType('postSearch');
  };

  return (
    <Wrapper>
      <Button onClick={onClickGetCurrentLocation}>내 위치</Button>
      <Button onClick={onClickRecentPosts}>최근 지역</Button>
      <Button onClick={onClickPostSearch}>주소 검색</Button>
      <Button onClick={onClickNoPost}>지역설정안함</Button>
      <PostTextBox>{post}</PostTextBox>
      {isOpenModal && type === 'recent' && (
        <RecentPostModal list={recentPostList} setPost={setPost} />
      )}
      {isOpenModal && type === 'postSearch' && <PostSearchModal />}
    </Wrapper>
  );
}
export default PostCode;

const Wrapper = styled.div`
  width: 60%;
`;

const Button = styled.button`
  padding: 10px;
`;

const PostTextBox = styled.div`
  width: 60%;
  height: 30px;
  background-color: rgba(210, 210, 210, 0.5);
  border: 1px solid rgb(120, 120, 120);
  margin-top: 18px;
`;
