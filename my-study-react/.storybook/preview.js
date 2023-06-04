import '../src/index.css'; // 적용하고 싶은 css 파일을 import

// msw addon 등록
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const decoratorStyle = Story => (
  <div style={{ margin: '1em' }}>
    <Story />
  </div>
);

// msw addon을 글로벌로 provider
export const decorators = [mswDecorator, decoratorStyle];

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
