import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'

import { GlobalStyles } from '@/styles/global'
import { theme } from '@/styles/theme'
import { config } from '@fortawesome/fontawesome-svg-core'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'styled-components'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  )
}
