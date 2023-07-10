import './index.css'

import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../src/styles/global'
import { theme } from '../src/styles/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview
