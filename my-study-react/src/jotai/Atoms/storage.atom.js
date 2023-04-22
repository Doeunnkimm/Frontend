import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage('darkMode', false);

/*
    atomWithStorage는 atom을 생성할 때 
    해당 atom의 상태를 웹 스토리지에 저장하고 관리 !

    -> 이때 생성된 atom은 useAtom으로 불러올 수 있고,
       참고로, 이를 통해 웹 스토리지에 저장된 데이터를 불러올 수 있다.

    * 해당 값을 간결하게 ussAtom을 통해 불러올 수 있다는 점도 좋았음
    * atom의 상태를 업데이트하면 웹 스토리지에 저장된 값도 변경한다는 점도 좋았음
    * 다시 렌더링하거나 React 애플리케이션을 다시 시작하더라도 atom이 웹 스토리지에 저장된 값으로 계속 값을 유지할 수 있다는 점도 좋았음
       <=> 다시 렌더링하면 초기값으로 돌아가는 useState와는 다르게! 
*/
