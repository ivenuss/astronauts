import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {},
  styles: {},
  components: {
    Table: {
      "&:last-child td": {
        borderBottom: 0,
      },
    },
  },
});

export default customTheme;
