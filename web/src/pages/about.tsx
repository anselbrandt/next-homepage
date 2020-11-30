import { Box, useColorMode, Text, Link as ChakraLink } from "@chakra-ui/core";
import { Container } from "../components/Container";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { createUseStyles } from "react-jss";
import readme from "../../README.md";
import colors from "../utils/colors";
import Navbar from "../components/Navbar";
import { useState } from "react";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

interface StyleProps {
  [prop: string]: string;
}

interface AboutProps {
  defaultColor: string;
}

const About: React.FC<AboutProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const linkColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  const codeColor = { light: colors.gray[600], dark: colors.gray[400] };
  const bordColor = { light: colors.gray[400], dark: colors.gray[600] };
  const bgColor = { light: colors.gray[200], dark: colors.gray[700] };

  const [styleProps, setStyleProps] = useState<StyleProps>();

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

export default About;
