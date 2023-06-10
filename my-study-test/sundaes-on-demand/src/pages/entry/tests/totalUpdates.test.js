import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

/**
 * 스쿱이 변경될 때 total이 변경되는지 테스트
 */
test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  /**
   * 여기서 Options는 Provider로 래핑되어 있지 않음
   * 그래서 context를 이용해서 테스트를 진행하고 싶다면
   * context를 제공해야 한다
   */
  render(<Options optionType={'scoops'} />);

  // $0.00d으로 세팅
  // 부분적으로 text를 매핑하고 싶다면 exact 옵션을 false로 해주면 됨
  const scoopSubtotal = screen.getByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  // 바닐라 스쿱을 1개로 업데이트하고 subtotal 확인
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1'); // 입력
  expect(scoopSubtotal).toHaveTextContent('2.00');

  // 초콜릿 스쿱을 2개로 업데이트하고 subtotal 확인
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00');
});
