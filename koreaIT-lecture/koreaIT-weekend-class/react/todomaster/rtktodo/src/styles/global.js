import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

/*
styled - reset
npm i styled-reset
*/

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #e7e7e7;
    }
    button {
        border: none;
    }

    ul > li {
        list-style: none;
    }
`

export default GlobalStyles
