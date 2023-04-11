import { useEffect, useState } from 'react';

const useCurrentLocation = options => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const [error, setError] = useState();

  // 성공 callback
  const onSuccess = pos => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  // 실패 callback
  const onError = error => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError(
        '내 위치 찾기를 지원하지 않습니다. 위치 찾기를 허용했는지 확인해주세요.'
      );
      return;
    }

    // geolocation API 호출
    geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return { location, error };
};
export default useCurrentLocation;
