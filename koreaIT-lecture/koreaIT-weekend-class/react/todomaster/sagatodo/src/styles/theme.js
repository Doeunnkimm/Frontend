const PALETTE = {
  primary: {
    100: '#CCFFF9',
    200: '#00E5C9',
    300: '#00C7AE',
  },
  subColor: '#EBF1F4',
  fontColor: '#FFFFFF',
  error: '#FF0000',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    100: 'E9E9E9',
    200: '#D9D9D9',
    300: '#656565',
  },
};

const FONT_SIZE = {
  small: '14px',
  medium: '18px',
  large: '20px',
};

const FONT_WEIGHT = {
  thin: '100',
  reguler: '400',
  bold: '800',
};

// 하나로 묶어서 객체화
const theme = {
  PALETTE,
  FONT_WEIGHT,
  FONT_SIZE,
};

export default theme;
