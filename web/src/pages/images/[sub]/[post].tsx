import {
  Box,
  Link as ChakraLink,
  Image,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../../components/Container";
import { DarkModeSwitch } from "../../../components/DarkModeSwitch";
import { Navbar } from "../../../components/Navbar";
import usePostFetch from "../../../hooks/usePostFetch";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { createUseStyles } from "react-jss";
import colors from "../../../utils/colors";
import useIsomorphicLayoutEffect from "../../../hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

interface PostProps {
  defaultColor: string;
}

interface StyleProps {
  [prop: string]: string;
}

const Post: React.FC<PostProps> = ({ defaultColor }) => {
  const router = useRouter();
  const sub = router.query.sub as string;
  const post = router.query.post as string;
  const { fetchedPost, fetchedComments, isPostLoading } = usePostFetch({
    subreddit: sub,
    postId: post,
  });

  const { colorMode } = useColorMode();
  const linkColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };

  const [styleProps, setStyleProps] = useState<StyleProps>();

  const useStyles = createUseStyles({
    markdown: (props) => ({
      "& a": {
        color: props.linkColor,
      },
      "& a:hover": {
        textDecoration: "underline",
      },
    }),
  });

  interface MarkdownProps {
    children: string;
    linkColor: string;
  }

  const Markdown: React.FC<MarkdownProps> = ({ children, ...props }) => {
    const classes = useStyles(props);
    return (
      <Box className={classes.markdown}>
        <ReactMarkdown plugins={[gfm]}>{children}</ReactMarkdown>
      </Box>
    );
  };

  Markdown.defaultProps = {
    linkColor: linkColor[colorMode],
  };

  useIsomorphicLayoutEffect(() => {
    setStyleProps({
      linkColor: linkColor[colorMode],
    });
  }, [colorMode]);

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
                <Markdown styleProps={styleProps}>{comment.body}</Markdown>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Post;
