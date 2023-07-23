import { extendTheme } from '@chakra-ui/react'

const colors = {
  success: '#1B842C',
  error: '#F44336',
  gray: {
    100: 'rgb(170, 170, 170)',
    200: 'rgb(200, 200, 200)',
    300: 'rgb(220, 220, 220)',
    400: '#f6f8fa;',
  },
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#7895CB',
  },
}

export const theme = extendTheme({ colors })
