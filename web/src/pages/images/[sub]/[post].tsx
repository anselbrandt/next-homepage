import { Box, Link as ChakraLink, Image, Heading, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { DarkModeSwitch } from "../../../components/DarkModeSwitch";
import { Navbar } from "../../../components/Navbar";
import usePostFetch from "../../../hooks/usePostFetch";
import { Markdown } from "../../../components/Markdown";
import { useEffect } from "react";
import Cookie from "js-cookie";

interface PostProps {
  defaultColor: string;
}

const Post: React.FC<PostProps> = ({ defaultColor }) => {
  const router = useRouter();
  const sub = router.query.sub as string;
  const post = router.query.post as string;
  const { fetchedPost, fetchedComments } = usePostFetch({
    subreddit: sub,
    postId: post,
  });

  useEffect(() => {
    const prevSearch = Cookie.get("searchResult");
    if (prevSearch) {
      Cookie.set("prevSearch", prevSearch);
    } else {
      Cookie.remove("prevSearch");
    }
  }, []);

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box width="100%" maxW="600px">
        <Box>
          <ChakraLink href={fetchedPost.image}>
            <Image src={fetchedPost.preview} objectFit="cover" />
          </ChakraLink>
        </Box>
        <Box mt="10" mx="2">
          <ChakraLink href={fetchedPost.permalink}>
            <Heading size="sm">{fetchedPost.title}</Heading>
          </ChakraLink>
          <Text fontSize="sm" mt="2" ml="8">
            <ChakraLink href={fetchedPost.profile}>
              {fetchedPost.author}
            </ChakraLink>
          </Text>
        </Box>
        <Box mt="10" mx="2" mb="10">
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
                <Markdown defaultColor={defaultColor} source={comment.body} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Post;
