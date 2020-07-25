import { theme } from '@chakra-ui/core';

const CustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    colors: {
      heading: '#000000',
      text: '#9b9b9b',
      bgDefault: '#40ba37',
      bgGray: '#f3f5f8',
      white: '#ffffff',
      dark: '#141414',
      border: '#1c8314',
      hover: '#40ba37',
      footer: '#2d2d2d',
      secondary: '#3c3c3c',
      text2: '#474747',
    },
  },
};

export default CustomTheme;
