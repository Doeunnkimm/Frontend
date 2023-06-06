import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  // const { container } = render(<App />);
  // logRoles(container);
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('button turns blue when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // 버튼을 클릭
  fireEvent.click(colorButton);

  // 배경 색이 파란색으로 바뀌는 것을 expect
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  // 눌렸으므로 버튼 텍스트도 Change to red가 되는 것을 expect
  expect(colorButton).toHaveTextContent('Change to red');
});

/**
 * 체크박스가 체크되면 버튼이 비활성화 동작 관련 테스팅
 */

// 초기 상태 테스팅
test('initial conditions', () => {
  render(<App />);

  // 버튼이 활성화 상태로 시작하는지를 확인
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  // toBeEnabled : 활성화를 확인할 수 있는 매처
  expect(colorButton).not.toBeDisabled();

  // 체크박스가 체크 안 된 상태로 시작하는지 확인
  const checkbox = screen.getByRole('checkbox');
  // not : 단언을 부정하기 위한 jest 단언
  expect(checkbox).not.toBeChecked();
});

// 체크 박스를 체크하면 버튼이 비활성화 상태 테스팅
test('Disable the button by checking the check box', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox');

  // 체크박스 체크
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // 두 번째 클릭  (체크 해제)
  fireEvent.click(checkbox);
  expect(colorButton).not.toBeDisabled();
});
