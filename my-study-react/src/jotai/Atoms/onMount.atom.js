import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';
import { useRef } from 'react';

// mount, unmount 기본 형태
export const anAtom = atom(1);
anAtom.onMount = setAtom => {
  console.log('atom is mounted in provider');
  setAtom(c => c + 1);
  return () => {
    // return optional onUnmount function
  };
};

// mount를 활용한 초기값 설정 예제
const countAtom = atom(1);
const derivedAtom = atom(
  get => get(countAtom),
  (get, set, action) => {
    if (action.type === 'init') {
      set(countAtom, 10);
    } else if (action.type === 'inc') {
      set(countAtom, c => c + 1);
    }
  }
);

derivedAtom.onMount = setAtom => {
  setAtom({ type: 'init' });
};

// atom의 onMount로 useEffect 대체해보기
// const htmlRefAtom = atom(null);

// const Component = () => {
//   const ref = useRef();

//   const mountingAtom = useMemo(() => {
//     const a = atom(
//       get => get(htmlRefAtom),
//       (get, set, action) => set(htmlRefAtom, action)
//     );
//     a.onMount = set => {
//       set(ref.current);
//     };
//     return a;
//   }, []);

//   useAtom(mountingAtom);
//   return <div ref={ref}>Hello</div>;
// };

const loggedInModeAtom = atom(false);

const INIT = Symbol(); // or anything that doesn't conflict with data. -> const한 키값 정도로 생각
const baseFeedDataAtom = atom(null); // this is hidden (not exported) -> 관심사 분리해라

const feedDataAtom = atom(
  get => get(baseFeedDataAtom),
  (get, set, action) => {
    if (action === INIT) {
      const path = get(loggedInModeAtom)
        ? '/private-feed-data'
        : '/public-feed-data';
      fetch(path).then(response => {
        set(baseFeedDataAtom, response.data);
      });
    } else {
      set(baseFeedDataAtom, action);
    }
  }
);
feedDataAtom.onMount = dispatch => {
  dispatch(INIT);
};
