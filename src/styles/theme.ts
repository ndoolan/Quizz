import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config = {
    initialColorMode: "light",
    useSystemColorMode: false, 
}; 

const theme = extendTheme({ config });

export default theme;