import { Box, useColorMode } from "@chakra-ui/core";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import colors from "../utils/colors";
import { createUseStyles } from "react-jss";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

interface MarkdownProps {
  defaultColor: string;
  source: string;
}

interface StyleProps {
  [prop: string]: string;
}

interface GFMarkdownProps {
  source: string;
  linkColor: string;
  styleProps: StyleProps | undefined;
}

export const Markdown: React.FC<MarkdownProps> = ({ defaultColor, source }) => {
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

  const GFMarkdown: React.FC<GFMarkdownProps> = ({ source, ...props }) => {
    const classes = useStyles(props);
    return (
      <Box className={classes.markdown}>
        <ReactMarkdown plugins={[gfm]}>{source}</ReactMarkdown>
      </Box>
    );
  };

  GFMarkdown.defaultProps = {
    linkColor: linkColor[colorMode],
  };

  useIsomorphicLayoutEffect(() => {
    setStyleProps({
      linkColor: linkColor[colorMode],
    });
  }, [colorMode]);

  return (
    <GFMarkdown
      styleProps={styleProps}
      linkColor={linkColor[colorMode]}
      source={source}
    />
  );
};
