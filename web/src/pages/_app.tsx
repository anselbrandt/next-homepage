import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Cookies from "universal-cookie";
import "./_app.css";
import theme from "../theme";

function App({ Component, pageProps, initialColorMode }: any) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: initialColorMode }}>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

App.getInitialProps = async ({ ctx }: any) => {
  const cookies = new Cookies(ctx.req?.headers.cookie);
  const colorMode = cookies.get("colorMode");
  return {
    pageProps: {
      defaultColor: "purple",
    },
    initialColorMode: colorMode,
  };
};

export default App;
