import { Flex, Heading } from "@chakra-ui/core";

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" height="100vh">
    <Heading fontSize="10vw" mt="20vh">
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "ansel brandt",
};
