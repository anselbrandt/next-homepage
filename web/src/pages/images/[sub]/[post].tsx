import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { DarkModeSwitch } from "../../../components/DarkModeSwitch";
import { Navbar } from "../../../components/Navbar";

interface PostProps {
  defaultColor: string;
}

const Post: React.FC<PostProps> = ({ defaultColor }) => {
  const router = useRouter();
  const post = router.query.post;
  const sub = router.query.sub;
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>{post}</Box>
        <Box>{sub}</Box>
      </Box>
    </Container>
  );
};

export default Post;
