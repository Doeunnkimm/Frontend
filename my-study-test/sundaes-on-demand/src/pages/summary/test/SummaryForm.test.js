import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

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

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  // 체크박스를 체크하면 버튼 활성화
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // 다시한번 클릭해 체크를 해제하면 다시 비활성화
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
