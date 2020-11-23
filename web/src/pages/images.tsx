import { useState, useEffect, useRef } from "react";
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
import { Listings } from "../components/Listings";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [subreddit, setSubreddit] = useState<string | undefined>();
  const [cursor, setCursor] = useState<string | null>(null);
  const [displayedListings, setDisplayedListings] = useState<any[]>([]);
  const { autocompleteList } = useAutocomplete({ searchTerm: searchTerm });
  const { fetchedListings, isLoading, next } = useListingsFetch({
    subreddit: subreddit,
    cursor: cursor,
  });

  const bottomObserver = useRef<any>();
  const [bottom, setBottom] = useState<any>(null);

  const handleSearch = (event: any) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    setSubreddit(undefined);
    setCursor(null);
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

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCursor(next);
      }
    });
    bottomObserver.current = observer;
  }, [next, isLoading, bottomObserver]);
  useEffect(() => {
    if (isLoading) return;
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom, isLoading, bottomObserver]);

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
        <Listings
          fetchedListings={fetchedListings}
          isLoading={isLoading}
          sub={subreddit}
          setBottom={setBottom}
        />
        {displayedListings.length === 0 && <Directory />}
      </Box>
    </Container>
  );
};

export default Images;
