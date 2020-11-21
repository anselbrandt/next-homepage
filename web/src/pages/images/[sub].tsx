import {
  AspectRatio,
  Box,
  Link as ChakraLink,
  Image,
  Grid,
  Spinner,
  Flex,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Navbar } from "../../components/Navbar";
import useListingsFetch from "../../hooks/useListingsFetch";

interface SubProps {
  defaultColor: string;
}

const Sub: React.FC<SubProps> = ({ defaultColor }) => {
  const router = useRouter();
  const sub = router.query.sub as string;
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchedListings, isLoading, next } = useListingsFetch({
    subreddit: sub,
    cursor: cursor,
  });

  const bottomObserver = useRef<any>();
  const [bottom, setBottom] = useState<any>(null);

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
    <Container minHeight="100vh" width="100vw">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={1}
        width="100%"
        maxWidth="1000px"
      >
        {fetchedListings.map((value, index) => {
          if (index === fetchedListings.length - 1) {
            return (
              <Box key={value.id} ref={setBottom}>
                <ChakraLink href={`${sub}/${value.id}`}>
                  <AspectRatio ratio={1}>
                    <Image src={value.preview} objectFit="cover" />
                  </AspectRatio>
                </ChakraLink>
              </Box>
            );
          } else {
            return (
              <Box key={value.id}>
                <ChakraLink href={`${sub}/${value.id}`}>
                  <AspectRatio ratio={1}>
                    <Image src={value.preview} objectFit="cover" />
                  </AspectRatio>
                </ChakraLink>
              </Box>
            );
          }
        })}
        {isLoading ? (
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner thickness="4px" speed="0.65s" size="xl" />
          </Flex>
        ) : null}
      </Grid>
    </Container>
  );
};

export default Sub;
