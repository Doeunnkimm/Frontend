import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useCurrentLocation from '../../../../Hooks/useCurrentPosition';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isOpenModalAtom } from '../../../../Atoms/modal.atom';
import RecentPostModal from './Components/RecentPostModal';
import PostSearchModal from './Components/PostSearchModal';

function PostCode({ setFormData }) {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom);
  const [type, setType] = useState('');
  const [post, setPost] = useState('');
  const [recentPostList, setRecentPostList] = useState(
    JSON.parse(localStorage.getItem('recentPosts')) === null
      ? []
      : [...JSON.parse(localStorage.getItem('recentPosts'))]
  );

  useEffect(() => setFormData(prev => ({ ...prev, region: post })), [post]);

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };

  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);

  const onAddRecentPost = post => {
    localStorage.setItem(
      'recentPosts',
      JSON.stringify(
        recentPostList === null
          ? [post]
          : [...new Set([post, ...recentPostList])].splice(0, 5)
      )
    );
  };

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
        onAddRecentPost(recentPost);
      });
  };

  useEffect(() => {
    setRecentPostList(JSON.parse(localStorage.getItem('recentPosts')));
  }, [post]);

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
      <Button type="button" onClick={onClickGetCurrentLocation}>
        내 위치
      </Button>
      <Button type="button" onClick={onClickRecentPosts}>
        최근 지역
      </Button>
      <Button type="button" onClick={onClickPostSearch}>
        주소 검색
      </Button>
      <PostTextBox>{post}</PostTextBox>
      {isOpenModal && type === 'recent' && (
        <RecentPostModal
          list={recentPostList}
          setPost={setPost}
          onAddRecentPost={onAddRecentPost}
        />
      )}
      {isOpenModal && type === 'postSearch' && (
        <PostSearchModal setPost={setPost} onAddRecentPost={onAddRecentPost} />
      )}
    </Wrapper>
  );
}
export default PostCode;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Button = styled.button`
  border: 1px solid rgb(220, 220, 220);
  outline: none;
  margin-right: 5px;
  border-radius: 4px;
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
`;

const PostTextBox = styled.div`
  flex-grow: 1;
  padding: 10px;
  height: 23px;
  border: 1px solid rgb(180, 180, 180);
  margin-top: 8px;
`;
