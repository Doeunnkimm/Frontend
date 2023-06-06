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
