import React, { useState, useEffect } from "react";
import {
  Box,
  useColorMode,
  Text,
  Link as ChakraLink,
  Heading,
  Flex,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { createUseStyles } from "react-jss";
import colors from "../utils/colors";
import Navbar from "../components/Navbar";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import useFetch from "../hooks/useFetch";
import { GithubIcon } from "../components/GithubIcon";

interface StyleProps {
  [prop: string]: string;
}

interface WemoProps {
  defaultColor: string;
}

const Wemo: React.FC<WemoProps> = ({ defaultColor }) => {
  const [readme, setReadme] = useState<any>();
  const [readme2, setReadme2] = useState<any>();
  const [data] = useFetch(
    "https://raw.githubusercontent.com/anselbrandt/wemo-app/master/README.md"
  );
  const [data2] = useFetch(
    "https://raw.githubusercontent.com/anselbrandt/wemo-app/master/src/wemo.md"
  );
  const { colorMode } = useColorMode();
  const color = { light: "black", dark: "white" };
  const linkColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  const codeColor = { light: colors.gray[600], dark: colors.gray[400] };
  const bordColor = { light: colors.gray[400], dark: colors.gray[600] };
  const bgColor = { light: colors.gray[200], dark: colors.gray[700] };

  const [styleProps, setStyleProps] = useState<StyleProps>();

  useEffect(() => {
    if (data) {
      setReadme(data);
    }
  }, [data]);

  useEffect(() => {
    if (data2) {
      setReadme2(data2);
    }
  }, [data2]);

  const useStyles = createUseStyles({
    markdown: (props) => ({
      width: "100%",
      padding: "2rem",
      "& a": {
        color: props.linkColor,
      },
      "& a:hover": {
        textDecoration: "underline",
      },
      "& p": { marginBottom: "1rem" },
      "& h1": {
        fontSize: "2.5rem",
        fontWeight: "bold",
        lineHeight: "normal",
        marginBottom: "2rem",
      },
      "& h2": { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" },
      "& h3": { fontSize: "1.35rem", marginBottom: "1rem" },
      "& code": {
        color: props.codeColor,
        backgroundColor: props.bgColor,
      },
      "& pre": {
        color: props.codeColor,
        backgroundColor: props.bgColor,
        padding: "1rem",
        border: "1px solid",
        borderColor: props.bordColor,
        overflow: "scroll",
        marginBottom: "1rem",
      },
      "& table": {
        color: props.codeColor,
        backgroundColor: props.bgColor,
        padding: "1rem",
        border: "1px solid",
        borderColor: props.bordColor,
        overflow: "scroll",
        marginBottom: "1rem",
      },
      "& th": {
        padding: ".5rem",
        border: "1px solid",
        borderColor: props.bordColor,
      },
      "& td": {
        padding: ".5rem",
        border: "1px solid",
        borderColor: props.bordColor,
      },
    }),
  });

  const Markdown = ({ ...props }) => {
    const classes = useStyles(props);
    return (
      <Box className={classes.markdown} mt="4rem" maxWidth="48rem">
        <ReactMarkdown plugins={[gfm]} source={readme} />
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          mt={16}
        >
          <ChakraLink href="https://github.com/anselbrandt/wemo-app">
            <GithubIcon size={32} fill={color[colorMode]} />
          </ChakraLink>
        </Flex>
        <Box mt="10rem" mb="2rem">
          <Heading as="h1">Wemo API</Heading>
        </Box>
        <ReactMarkdown plugins={[gfm]} source={readme2} />
      </Box>
    );
  };

  Markdown.defaultProps = {
    linkColor: linkColor[colorMode],
    bordColor: bordColor[colorMode],
    bgColor: bgColor[colorMode],
    codeColor: codeColor[colorMode],
  };

  useIsomorphicLayoutEffect(() => {
    setStyleProps({
      linkColor: linkColor[colorMode],
      bordColor: bordColor[colorMode],
      bgColor: bgColor[colorMode],
      codeColor: codeColor[colorMode],
    });
  }, [colorMode]);

  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Markdown styleProps={styleProps} />
      <Box mb={4}>
        <ChakraLink href="https://github.com/anselbrandt/wemo-app">
          <GithubIcon size={32} fill={color[colorMode]} />
        </ChakraLink>
      </Box>
      <Text m="2rem" fontSize="md">
        This page has been autogenerated from README.md using{" "}
        <ChakraLink
          color={linkColor[colorMode]}
          href="https://remarkjs.github.io/react-markdown/"
        >
          react-markdown
        </ChakraLink>{" "}
        and{" "}
        <ChakraLink
          color={linkColor[colorMode]}
          href="https://cssinjs.org/react-jss/"
        >
          react-jss
        </ChakraLink>
      </Text>
    </Container>
  );
};

export default Wemo;