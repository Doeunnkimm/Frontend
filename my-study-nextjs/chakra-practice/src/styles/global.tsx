'use client'

import { Global, css } from '@emotion/react'

const GlobalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        list-style: none;
      }
    `}
  />
)
export default GlobalStyles
