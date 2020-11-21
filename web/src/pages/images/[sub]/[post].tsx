import { Box, Link as ChakraLink, Image, Heading, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { DarkModeSwitch } from "../../../components/DarkModeSwitch";
import { Navbar } from "../../../components/Navbar";
import usePostFetch from "../../../hooks/usePostFetch";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

interface PostProps {
  defaultColor: string;
}

const Post: React.FC<PostProps> = ({ defaultColor }) => {
  const router = useRouter();
  const sub = router.query.sub as string;
  const post = router.query.post as string;
  const { fetchedPost, fetchedComments, isPostLoading } = usePostFetch({
    subreddit: sub,
    postId: post,
  });

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box maxW="48rem">
        <Box>
          <ChakraLink href={fetchedPost.image}>
            <Image src={fetchedPost.preview} objectFit="cover" />
          </ChakraLink>
        </Box>
        <Box mt="4" mx="2">
          <ChakraLink href={fetchedPost.permalink}>
            <Heading size="sm">{fetchedPost.title}</Heading>
          </ChakraLink>
          <ChakraLink href={fetchedPost.profile} mt="2" ml="8">
            {fetchedPost.author}
          </ChakraLink>
        </Box>
        <Box mt="8" mx="2">
          {fetchedComments.map((comment) => (
            <Box key={comment.id} mt="4">
              <Box>
                <Text fontSize="xs">
                  <ChakraLink href={comment.profile}>
                    {comment.author}
                  </ChakraLink>
                </Text>
              </Box>
              <Box ml="8" mt="2">
                <Markdown plugins={[gfm]}>{comment.body}</Markdown>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Post;
