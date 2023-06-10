/**
 * Custom Render를 위한 파일
 */
import { render } from '@testing-library/react';
import { OrderDetailProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) =>
  // ui는 렌더링하려는 jsx
  render(ui, { wrapper: OrderDetailProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
