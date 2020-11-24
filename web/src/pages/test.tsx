import { Box, Link as ChakraLink, Input } from "@chakra-ui/core";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import Cookie from "js-cookie";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const target = "cabinporn";
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [cookies, setCookies] = useState<string | undefined>();
  const [prevSearch, setPrevSearch] = useState<string | undefined>();

  useEffect(() => {
    if (searchTerm === target) {
      Cookie.set("searchTerm", searchTerm);
    } else {
      Cookie.remove("searchTerm");
    }
  }, [searchTerm]);

  useEffect(() => {
    const readCookies = Cookie.getJSON();
    setCookies(JSON.stringify(readCookies));
  });

  useEffect(() => {
    const prevResult = Cookie.get("subreddit");
    if (prevResult) {
      setSearchTerm(prevResult);
    }
  }, []);

  const handleSearch = (event: any) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    setPrevSearch(value);
  };
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/cookieTest">cookieTest</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>
          {prevSearch ? `prevSearch: ${prevSearch}` : "no previous search"}
        </Box>
        <Input
          type="text"
          borderRadius="0"
          list="subreddits"
          placeholder="search for subreddit"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={handleSearch}
          value={searchTerm}
        />
      </Box>
      <Box>{searchTerm}</Box>
      <Box>{searchTerm === target ? "match!" : "does not match"}</Box>
      <Box>{cookies}</Box>
    </Container>
  );
};

export default Test;
