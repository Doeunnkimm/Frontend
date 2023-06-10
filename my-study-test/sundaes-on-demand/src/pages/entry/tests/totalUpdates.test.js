import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType={'toppings'} />);

  // $0.00으로 세팅
  const toppingsTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // cherries를 add하고 subtotal 체크
  // axios 호출 이후 페이지에 채워진 토핑을 대기해야 하므로
  // await를 붙여서 find하고 있다
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  await user.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');

  // hot fudge를 add하고 subtotal 체크
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  // hot fudge를 remove하고 subtotal 체크
  await user.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('0.00');

    unmount();
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item if removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(cherriesCheckbox);
    // grand total: $1.50

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    // remove 1 scoop of vanilla and check grand total
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    // check grand total
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('3.50');

    // remove cherries and check grand total
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
