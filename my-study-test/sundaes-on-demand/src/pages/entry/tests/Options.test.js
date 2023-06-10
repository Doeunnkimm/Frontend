import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

/**
 * 서버에서 반환할 각 옵션의 이미지를 띄우는지 테스트
 */
test('displays image for each scoop option from server', async () => {
  render(<Options optionType={'scoops'} />);
  // 이미지 find
  // 정규식에서 $는 ~~로 끝나는
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  // 길이 expect
  expect(scoopImages).toHaveLength(2);
  // alt expect
  const altText = scoopImages.map(el => el.alt);
  // 배열이나 객체의 동등함을 expect할 때는 toBe...가 아니라 toEqual !!
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each toppings option from server', async () => {
  render(<Options optionType={'toppings'} />);

  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  const imageTitles = images.map(img => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
