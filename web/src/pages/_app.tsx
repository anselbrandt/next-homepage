import { ChakraProvider, cookieStorageManager } from "@chakra-ui/core";
import "./_app.css";

import theme from "../theme";

function App({ Component, pageProps, cookies }: any) {
  const colorModeManager = cookieStorageManager(cookies);
  return (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

App.getInitialProps = async ({ ctx }: any) => {
  return {
    pageProps: {
      defaultColor: "purple",
    },
    cookies: ctx.req.headers.cookie ?? "",
  };
};

export default App;
