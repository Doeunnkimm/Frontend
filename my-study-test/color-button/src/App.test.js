import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

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
  expect(colorButton).toBeEnabled();

  // 체크박스가 체크 안 된 상태로 시작하는지 확인
  const checkbox = screen.getByRole('checkbox');
  // not : 단언을 부정하기 위한 jest 단언
  expect(checkbox).not.toBeChecked();
});

// 체크 박스를 체크하면 버튼이 비활성화 상태 테스팅
test('Disable the button by checking the check box', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  // checkbox의 name은 label
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

  // 체크박스 체크
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // 두 번째 클릭  (체크 해제)
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

/**
 * 비활성화된 버튼 동작 테스트
 */
test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  // 클릭해서 파란색으로
  fireEvent.click(colorButton);

  // 체크박스 체크 -> 버튼 비활성화
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  // 다시 체크박스 체크 -> 버튼 활성화(파란색)
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
});

// describe 문은 테스트를 결합하는 것
// 모든 테스트에 대해 카멜 케이스 대문자 앞에 공백을 삽입하는 구문
describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for on inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});
