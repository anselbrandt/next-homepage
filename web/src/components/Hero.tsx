import { Flex, Heading } from "@chakra-ui/core";

export const Hero = ({ title }: { title: string }) => (
  <Flex justifyContent="center" height="100vh">
    <Heading fontSize="6vw" mt="20vh">
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "next-express-graphql.tsx",
};
