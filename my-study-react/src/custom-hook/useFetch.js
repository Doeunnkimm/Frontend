import {useEffect, useState} from 'react';

// initialType :  제일 처음 불러올 내용의 type
export function useFetch(baseUrl, initialType) {
  const [data, setData] = useState(null);

  const fetchUrl = (type) => {
    fetch(baseUrl + '/' + type) // 더미 데이터를 반환
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  // 네트워크 상에서 데이터를 가져오는 fetch 커스텀 훅을 만들어보자
  useEffect(() => {
    fetchUrl(initialType);
  }, []);

  return {
    data,
    fetchUrl,
  };
}
