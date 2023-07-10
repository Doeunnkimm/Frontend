import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    html {
        font-size: 62.5%;

        @media screen and (max-width:820px) {
            font-size: 50%;
        }
    }

    body {
        padding: 0;
        margin: 0;
    }

    * {
        box-sizing: border-box;
        border: none;
        outline: none;
        list-style: none;
    }

    h1 {
        font-size:${({ theme }) => theme.FONT_SIZE.big};
    }

    h2 {
        font-size:${({ theme }) => theme.FONT_SIZE.huge};
    }

    h2 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.large}
    }

    h3 {
        font-size:${({ theme }) => theme.FONT_SIZE.large};
    }

    h3 ~ p {
        font-size:${({ theme }) => theme.FONT_SIZE.medium}
    }

    h3 ~ span {
        font-size:${({ theme }) => theme.FONT_SIZE.small}
    }

    h4 {
        font-size:${({ theme }) => theme.FONT_SIZE.medium};
    }

    p, div {
        font-size:${({ theme }) => theme.FONT_SIZE.small};
    }

    span {
        font-size:${({ theme }) => theme.FONT_SIZE.tiny}
    }
`
