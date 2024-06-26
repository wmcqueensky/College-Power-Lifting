import {createStandaloneToast, extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
      '::-webkit-scrollbar': {
        cursor: 'auto',
        width: '0.5rem',
        h: '0.5rem',
      },
      '::-webkit-scrollbar-thumb': {
        cursor: 'pointer !important',
        '&:hover': {
          bg: 'gray',
        },
        bg: 'gray.700',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-track': {
        bg: 'blackAlpha.600',
        borderRadius: 'full',
      },
    },
  },
  shadows: {
    glowWhite: '0px 0px 18px 0px rgba(125, 181, 228, 1)',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
  },
})

export const {ToastContainer, toast} = createStandaloneToast({theme, defaultOptions: {isClosable: true}})

export default theme
