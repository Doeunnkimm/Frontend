import SYButton from '@components/Button/Button';
import React, { useRef, useState } from 'react';

type State = {
  name: string;
};

const MainPage: React.FC = () => {
  const [state, setState] = useState<State>({
    name: '',
  });

  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  /*
    const res = axios<User>()
  */

  return (
    <SYButton
      variant={'primary'}
      shape={'round'}
      size={'small'}
      onClick={() => {}}
    />
  );
};
export default MainPage;
