import { useState, useEffect, useRef } from "react";
import {
  Box,
  Link as ChakraLink,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  FormControl,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import useAutocomplete from "../hooks/useAutocomplete";
import useListingsFetch from "../hooks/useListingsFetch";
import { useRouter } from "next/router";
import { Directory } from "../components/Directory";
import { Listings } from "../components/Listings";
import Cookie from "js-cookie";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [subreddit, setSubreddit] = useState<string | undefined>();
  const [cursor, setCursor] = useState<string | null>(null);
  const [displayedListings, setDisplayedListings] = useState<any[]>([]);
  const [cancel, setCancel] = useState<boolean>(false);
  const { autocompleteList } = useAutocomplete({
    searchTerm: searchTerm,
    cancel: cancel,
  });
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
    setCancel(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      router.push(`/images/${searchTerm}`);
    }
  };

  useEffect(() => {
    const prevSearch = Cookie.get("prevSearch");
    if (prevSearch) {
      setSearchTerm(prevSearch);
      setSubreddit(prevSearch);
      setCancel(true);
    }
  }, []);

  useEffect(() => {
    const names = autocompleteList.map((entry) => entry.name.toLowerCase());
    if (names.includes(searchTerm)) {
      setSubreddit(searchTerm);
      Cookie.set("searchResult", searchTerm);
    } else {
      setDisplayedListings([]);
    }
  }, [autocompleteList, searchTerm]);

  useEffect(() => {
    const names = autocompleteList.map((entry) => entry.name.toLowerCase());
    if (autocompleteList.length > 0 && !names.includes(searchTerm)) {
      Cookie.remove("searchResult");
      Cookie.remove("prevSearch");
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
                  value={searchTerm}
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
          linkPrefix={"images/"}
        />
        {displayedListings.length === 0 && <Directory />}
      </Box>
    </Container>
  );
};

export default Images;
