import { useState } from 'react';

// - 호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.
// - 호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 InModalOpened 상태가 설정된다.
// - 훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.
const useConfirmModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  return {
    toggleIsModalOpened,
    isModalOpened,
  };
};

export default useConfirmModal;
