import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { animeAtom, citiesAtom, progressAtom } from './Atoms';
import { darkModeAtom } from './Atoms/storage.atom';
import styled from 'styled-components';

function JotaiTest() {
  const [anime, setAnime] = useAtom(animeAtom);

  // state와 업데이트하는 함수를 분리하고 싶을 때
  const cities = useAtomValue(citiesAtom);
  const setCities = useSetAtom(citiesAtom);

  const progress = useAtomValue(progressAtom);

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <S.Wrapper darkMode={darkMode}>
      <ul>
        {anime.map(item => (
          <S.Li key={item.title} darkMode={darkMode}>
            {item.title}
          </S.Li>
        ))}
        <button
          onClick={() =>
            setAnime(anime => [
              ...anime,
              { title: 'Cowboy Bebop', year: 1998, watched: false },
            ])
          }
        >
          Add Cowboy Bebop
        </button>
      </ul>
      <ul>
        <S.Li darkMode={darkMode}>{Math.trunc(progress * 100)}% watched</S.Li>
      </ul>
      <button onClick={() => setDarkMode(prev => !prev)}>theme change !</button>
    </S.Wrapper>
  );
}

export default JotaiTest;

const Wrapper = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? 'black' : 'white')};
`;

const Li = styled.li`
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
`;

const S = { Wrapper, Li };
