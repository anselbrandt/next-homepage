import { Stack, StackProps } from "@chakra-ui/core";

export const Footer = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    p="1rem"
    mb="4rem"
    {...props}
  />
);
