import { ChakraProvider } from "@chakra-ui/core";
import "./_app.css";

import theme from "../theme";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

App.getInitialProps = async () => {
  return {
    pageProps: {
      defaultColor: "purple",
    },
  };
};

export default App;
