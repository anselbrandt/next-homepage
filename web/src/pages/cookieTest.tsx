import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import Cookie from "js-cookie";

interface CookieTestProps {
  defaultColor: string;
}

const CookieTest: React.FC<CookieTestProps> = ({ defaultColor }) => {
  const [cookies, setCookies] = useState<string | undefined>();
  const [sub, setSub] = useState<string | undefined>();

  useEffect(() => {
    const readCookies = Cookie.getJSON();
    setCookies(JSON.stringify(readCookies));
  });

  useEffect(() => {
    const searchTerm = Cookie.get("searchTerm");
    if (searchTerm) {
      Cookie.set("subreddit", searchTerm);
      setSub(searchTerm);
    } else {
      Cookie.remove("subreddit");
    }
  }, []);

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/cookieTest">cookieTest</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>{sub ? `from ${sub}` : "no previous results"}</Box>
        <Box>{cookies}</Box>
      </Box>
    </Container>
  );
};

export default CookieTest;
