import { useState, useEffect } from "react";
import {
  Box,
  Link as ChakraLink,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  FormControl,
  Spinner,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import useAutocomplete from "../hooks/useAutocomplete";
import useListingsFetch from "../hooks/useListingsFetch";
import { useRouter } from "next/router";
import { Directory } from "../components/Directory";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [subreddit, setSubreddit] = useState<string | undefined>();
  const [displayedListings, setDisplayedListings] = useState<any[]>([]);
  const { autocompleteList } = useAutocomplete({ searchTerm: searchTerm });
  const { fetchedListings, isLoading, next } = useListingsFetch({
    subreddit: subreddit,
  });

  const handleSearch = (event: any) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      router.push(`/images/${searchTerm}`);
    }
  };

  useEffect(() => {
    const names = autocompleteList.map((entry) => entry.name.toLowerCase());
    if (names.includes(searchTerm)) {
      setSubreddit(searchTerm);
    } else {
      setDisplayedListings([]);
    }
  }, [autocompleteList, searchTerm]);

  useEffect(() => {
    setDisplayedListings(fetchedListings);
  }, [fetchedListings]);

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box width="100%" maxWidth="1000px">
        <Flex justifyContent="center" mb="10">
          <Box>
            <FormControl onKeyDown={handleKeyDown}>
              <InputGroup>
                <InputLeftAddon children="r/" />
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
                />
              </InputGroup>
            </FormControl>
          </Box>
        </Flex>
        <datalist id="subreddits">
          {autocompleteList.map((entry) => (
            <option key={entry.key} value={entry.name} />
          ))}
        </datalist>
        {isLoading ? (
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </Flex>
        ) : (
          displayedListings.length === 0 && <Directory />
        )}
      </Box>
    </Container>
  );
};

export default Images;
