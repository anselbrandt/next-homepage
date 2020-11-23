import {
  Grid,
  Box,
  Link as ChakraLink,
  AspectRatio,
  Image,
  Flex,
  Spinner,
} from "@chakra-ui/core";

interface ListingsProps {
  fetchedListings: any[];
  isLoading: boolean;
  sub: string | undefined;
  setBottom: any;
}

export const Listings: React.FC<ListingsProps> = ({
  fetchedListings,
  setBottom,
  sub,
  isLoading,
}) => {
  return (
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
  );
};
