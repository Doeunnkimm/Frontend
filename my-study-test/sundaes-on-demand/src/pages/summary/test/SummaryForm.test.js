import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);

  // 체크박스의 초기상태는 체크가 안 된 상태
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  // 버튼의 초기상태는 disabled
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', async () => {
  /**
   * ⭐ userEvent의 메서드들은 모두 Promise를 반환한다.
   * ==> 이벤트 앞에 await
   */
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  // 체크박스를 체크하면 버튼 활성화
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // 다시한번 클릭해 체크를 해제하면 다시 비활성화
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

/**
 * 팝오버에 대한 테스트
 */
test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  /**
   * ⭐ 보이지 않는 무언가를 테스트할 때는 getBy를 사용 X
   */

  // 페이지가 로딩 상패일 때 - 팝오버가 감춰진 경우
  // 사실 팝오버는 디스플레이에 숨겨진 것이 아니라 페이지에 나타나지 않은 것
  // 지금 화면에는 없는 걸 찾아야 하므로 query를 사용
  // 실제 null임을 expect
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // 마우스를 체크 박스 위로 올렸을 때 팝업이 나타나는 경우
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  // hover하면 Document에 포함되는 것은 expect
  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  // 마우스가 해당 위치를 벗어나면 다시 버튼이 숨겨지는 경우
  await user.unhover(termsAndConditions);
  expect(nullPopover).not.toBeInTheDocument();
});
