import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";
import { useGetAllLikesQuery } from "../generated/graphql";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const { data } = useGetAllLikesQuery();
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>
          {data?.getAllLikes.likes.map((like) => (
            <Box>{like.postId}</Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default withApollo({ ssr: true })(Test);
