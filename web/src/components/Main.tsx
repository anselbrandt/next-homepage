import { Box, BoxProps } from "@chakra-ui/core";

export const Main = (props: BoxProps) => (
  <Box
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    mt="-70vh"
    pb="4rem"
    pt="4rem"
    px="1rem"
    {...props}
  />
);
