import {
  Grid,
  Box,
  Link as ChakraLink,
  AspectRatio,
  Image,
  Flex,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/core";
import { Favicon } from "../components/Favicon";

interface ListingsProps {
  fetchedListings: any[];
  isLoading: boolean;
  sub: string | undefined;
  setBottom: any;
  linkPrefix?: string | null;
  handleFav?: (event: React.MouseEvent<HTMLDivElement>) => void;
  likesData?: string[];
}

export const Listings: React.FC<ListingsProps> = ({
  fetchedListings,
  setBottom,
  sub,
  isLoading,
  linkPrefix,
  handleFav,
  likesData,
}) => {
  const [isTouchScreen] = useMediaQuery("(hover: none)");
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={1}
      width="100%"
      maxWidth="1000px"
    >
      {fetchedListings.map((listing, index) => {
        if (index === fetchedListings.length - 1) {
          return (
            <Box key={listing.id} ref={setBottom}>
              <AspectRatio ratio={1} position="relative">
                <ChakraLink href={`${linkPrefix || ""}${sub}/${listing.id}`}>
                  <Image
                    position="absolute"
                    src={listing.preview}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                  {!isTouchScreen ? (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      position="absolute"
                      width="100%"
                      height="100%"
                      opacity={0}
                      transition="opacity 0.5s"
                      backgroundColor="rgba(90,0,10,0.4)"
                      _hover={{ opacity: 1 }}
                    >
                      <Text as="b" fontSize="1rem" m="1rem" color="white">
                        {listing.title}
                      </Text>
                      <Box
                        as="button"
                        position="absolute"
                        bottom={0}
                        right={0}
                        padding="3"
                        id={listing.id}
                        onClick={handleFav}
                      >
                        <Favicon
                          checked={
                            likesData ? likesData.includes(listing.id) : false
                          }
                          overlay={true}
                          size={8}
                        />
                      </Box>
                    </Flex>
                  ) : null}
                </ChakraLink>
              </AspectRatio>
            </Box>
          );
        } else {
          return (
            <Box key={listing.id}>
              <AspectRatio ratio={1} position="relative">
                <ChakraLink href={`${linkPrefix || ""}${sub}/${listing.id}`}>
                  <Image
                    position="absolute"
                    src={listing.preview}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                  {!isTouchScreen ? (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      position="absolute"
                      width="100%"
                      height="100%"
                      opacity={0}
                      transition="opacity 0.5s"
                      backgroundColor="rgba(90,0,10,0.4)"
                      _hover={{ opacity: 1 }}
                    >
                      <Text as="b" fontSize="1rem" m="1rem" color="white">
                        {listing.title}
                      </Text>
                      <Box
                        as="button"
                        position="absolute"
                        bottom={0}
                        right={0}
                        padding="3"
                        id={listing.id}
                        onClick={handleFav}
                      >
                        <Favicon
                          checked={
                            likesData ? likesData.includes(listing.id) : false
                          }
                          overlay={true}
                          size={8}
                        />
                      </Box>
                    </Flex>
                  ) : null}
                </ChakraLink>
              </AspectRatio>
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
