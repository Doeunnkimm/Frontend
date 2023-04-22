import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { animeAtom, citiesAtom, progressAtom } from './Atoms';

function JotaiTest() {
  const [anime, setAnime] = useAtom(animeAtom);

  // state와 업데이트하는 함수를 분리하고 싶을 때
  const cities = useAtomValue(citiesAtom);
  const setCities = useSetAtom(citiesAtom);

  const progress = useAtomValue(progressAtom);

  return (
    <>
      <ul>
        {anime.map(item => (
          <li key={item.title}>{item.title}</li>
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
        <li>{Math.trunc(progress * 100)}% watched</li>
      </ul>
    </>
  );
}

export default JotaiTest;
