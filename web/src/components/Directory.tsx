import React from "react";
import { SimpleGrid, Box, Heading, Link as ChakraLink } from "@chakra-ui/core";
import { allsubs } from "../subs";

export const Directory = () => {
  return (
    <SimpleGrid mx="8" minChildWidth="150px">
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
  );
};
