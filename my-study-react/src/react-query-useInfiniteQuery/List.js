import axios from 'axios';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';

const api_key = process.env.REACT_APP_API_KEY;

function ListPage() {
  const [infinite, setInfinite] = useState(false);
  const getList = async page => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: { page, api_key },
    });
    return res.data.results;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ['infinity_popular_list'],
      ({ pageParam = 1 }) => getList(pageParam),
      {
        getNextPageParam: allPages => {
          // lastPage : 스크롤하는 순간 받아오는 데이터
          // allPages : 무한 스크롤링 하면서 누적하고 있는 데이터 리스트 [Array(20), Array(20) , ...]
          const nextPage = allPages.length + 1;
          return nextPage;
        },
      }
    );

  useEffect(() => {
    let fetching = false;
    const onScroll = async e => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    if (infinite) {
      document.addEventListener('scroll', onScroll);
    }
    return () => document.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage, infinite]);

  return (
    <div>
      <S.Wrapper>
        <ul>
          {data?.pages.map(page =>
            page.map(movie => (
              <li key={movie.id}>
                <div>{movie.title}</div>
                <div>{movie.overview}</div>
              </li>
            ))
          )}
        </ul>
      </S.Wrapper>
      {hasNextPage ? (
        <S.Button
          onClick={() => {
            setInfinite(true);
            fetchNextPage();
          }}
        >
          더보기
        </S.Button>
      ) : (
        <div>더이상 없습니다!</div>
      )}
      <div>{isLoading && !isFetchingNextPage && '로딩중..'}</div>
    </div>
  );
}
export default ListPage;

const Wrapper = styled.div`
  width: 100%;

  & > ul {
    display: flex;
    flex-wrap: wrap;

    & > li {
      width: 300px;
      height: 200px;
      padding: 10px;
      overflow: hidden;
      border: 1px solid black;
    }
  }
`;

const Button = styled.div`
  width: 70%;
  margin-left: 28px;
  text-align: center;
  background-color: darksalmon;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
`;

const S = { Wrapper, Button };
