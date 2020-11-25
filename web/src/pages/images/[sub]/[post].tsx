import {
  Box,
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  useColorMode,
  Flex,
  useToast,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { DarkModeSwitch } from "../../../components/DarkModeSwitch";
import { Navbar } from "../../../components/Navbar";
import usePostFetch from "../../../hooks/usePostFetch";
import { Markdown } from "../../../components/Markdown";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Favicon } from "../../../components/Favicon";
import colors from "../../../utils/colors";

interface PostProps {
  defaultColor: string;
}

const Post: React.FC<PostProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const linkColor = {
    light: "black",
    dark: "white",
  };
  const textColor = {
    light: "white",
    dark: "black",
  };
  const color = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  const router = useRouter();
  const sub = router.query.sub as string;
  const post = router.query.post as string;
  const { fetchedPost, fetchedComments } = usePostFetch({
    subreddit: sub,
    postId: post,
  });
  const toast = useToast();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    toast({
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box color={textColor[colorMode]} p={3} bg={color[colorMode]}>
          {!isChecked ? "Added to favorites" : "Removed from favorites"}
        </Box>
      ),
    });
    setIsChecked((prev) => !prev);
  };

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
          <Flex alignItems="center" justifyContent="space-between">
            <Heading size="sm">
              <ChakraLink
                href={`${fetchedPost.permalink}`}
                color={linkColor[colorMode]}
              >
                {fetchedPost.title}
              </ChakraLink>
            </Heading>
            <Box onClick={handleClick}>
              <Favicon
                size={7}
                checked={isChecked}
                defaultColor={defaultColor}
              />
            </Box>
          </Flex>

          <Text fontSize="sm" mt="2" ml="8">
            <ChakraLink href={`${fetchedPost.profile}`}>
              {fetchedPost.author}
            </ChakraLink>
          </Text>
        </Box>
        <Box mt="10" mx="2" mb="10">
          {fetchedComments.map((comment) => (
            <Box key={comment.id} mt="4">
              <Box>
                <Text fontSize="xs">
                  <ChakraLink href={`${comment.profile}`}>
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
