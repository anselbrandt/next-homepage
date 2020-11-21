import {
  AspectRatio,
  Box,
  Link as ChakraLink,
  Image,
  Grid,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
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
  const { fetchedListings, isLoading, next } = useListingsFetch({
    subreddit: sub,
  });

  return (
    <Container minHeight="100vh" width="100vw">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} width="1000px">
        {fetchedListings.map((value) => (
          <Box key={value.id}>
            <ChakraLink href={`${sub}/${value.id}`}>
              <AspectRatio ratio={1}>
                <Image src={value.preview} />
              </AspectRatio>
            </ChakraLink>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Sub;
