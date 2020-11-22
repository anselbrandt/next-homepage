import { useState } from "react";
import {
  Box,
  Link as ChakraLink,
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import { allsubs } from "../subs";
import useAutocomplete from "../hooks/useAutocomplete";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const { autocompleteList } = useAutocomplete({ searchTerm: searchTerm });

  const handleSearch = (event: any) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
  };

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box width="100%" maxWidth="1000px">
        <Flex justifyContent="center" mb="10">
          <Box>
            <InputGroup>
              <InputLeftAddon children="r/" />
              <Input
                borderRadius="0"
                list="subreddits"
                placeholder="search for subreddit"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={handleSearch}
              />
            </InputGroup>
          </Box>
        </Flex>
        <datalist id="subreddits">
          {autocompleteList.map((entry) => (
            <option key={entry.key} value={entry.name} />
          ))}
        </datalist>
        <SimpleGrid mx="8" minChildWidth="180px">
          {allsubs.map((value, index) => (
            <Box key={index}>
              <Heading>{value.category}</Heading>
              <Box>
                {value.subs.map((value, index) => (
                  <Box key={index}>
                    <ChakraLink href={`/images/${value}`}>{value}</ChakraLink>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Images;
