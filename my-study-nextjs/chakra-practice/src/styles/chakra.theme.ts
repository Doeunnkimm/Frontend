import { extendTheme } from '@chakra-ui/react'

const colors = {
  success: '#1B842C',
  error: '#F44336',

  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#7895CB',
  },
}

export const theme = extendTheme({ colors })
