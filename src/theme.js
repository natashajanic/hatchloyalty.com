const colors = {
  black: '#232323',
  blue: '#3ca1df',
  blueDark: '#2d5d95',
  blueLight: '#CDECFF',
  green: '#63bab0',
  greenDark: '#04575b',
  greenLight: '#79e9dd',
  greenXLight: '#ebfcfa',
  grayLight: '#dfdfdf',
  gray: '#999999',
  grayDark: '#666666',
  offBlack: '#484848',
  offWhite: '#f7f7f7',
  red: '#c34848',
  redDark: '#9c292d',
  redLight: '#f7e2e2',
  white: '#ffffff',
  yellow: '#ffc58b',
  yellowLight: '#fceddf',
  yellowDark: '#594430',
}

const fontSizes = [10, 12, 14, 16, 20, 24, 32, 48, 64, 72, 96]
const space = [0, 4, 8, 16, 32, 64, 128, 256]

export default {
  borders: [0, '1px solid', '2px solid'],
  breakpoints: ['960px', '1200px', '1400px'],
  colors,
  colorStyles: {
    default: {
      backgroundColor: colors.offWhite,
      border: `1px solid ${colors.grayLight}`,
      color: colors.grayDark,
    },
    defaultAlt: {
      backgroundColor: colors.white,
      color: colors.grayDark,
    },
    info: {
      backgroundColor: colors.blueLight,
      color: colors.blueDark,
    },
    primary: {
      backgroundColor: colors.greenXLight,
      color: colors.greenDark,
    },
    secondary: {
      backgroundColor: colors.greenXLight,
      color: colors.greenDark,
    },
    danger: {
      backgroundColor: colors.redLight,
      color: colors.redDark,
    },
    warning: {
      backgroundColor: colors.yellowLight,
      color: colors.yellowDark,
    },
    currentStep: {
      backgroundColor: colors.white,
      borderColor: colors.green,
      color: colors.green,
      fontWeight: 600,
    },
    completedStep: {
      backgroundColor: colors.green,
      borderColor: colors.green,
      color: colors.white,
    },
    disabledStep: {
      borderColor: colors.grayLight,
      color: colors.grayLight,
      cursor: 'not-allowed',
    },
    futureStep: {
      backgroundColor: colors.white,
      borderColor: colors.grayLight,
      color: colors.grayDark,
    },
  },
  fontSizes,
  fonts: ['-apple-system, BlinkMacSystemFont, sans-serif'],
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
  },
  lineHeight: '1.5',
  listTypes: ['none', 'disc'],
  shadows: [
    'none',
    `inset 0 0 0 1px ${colors.grayLight}`,
    `inset 0 0 0 1px ${colors.grayLight}, 0 0 4px ${colors.gray}`,
    `0 2px 6px 0 ${colors.grayLight}`,
  ],
  space,
  textColor: colors.offBlack,
  textStyles: {
    normal: {
      textTransform: 'none',
    },
    uppercase: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    lowercase: {
      textTransform: 'lowercase',
    },
  },
}
