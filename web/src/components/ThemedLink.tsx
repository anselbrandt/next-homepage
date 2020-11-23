import React from "react";
import { Link as ChakraLink, useColorMode } from "@chakra-ui/core";
import colors from "../utils/colors";

interface ThemedLinkProps {
  defaultColor: string;
  href: string;
}

export const ThemedLink: React.FC<ThemedLinkProps> = ({
  defaultColor,
  href,
  children,
}) => {
  const { colorMode } = useColorMode();
  const linkColor = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };
  return (
    <ChakraLink href={href} color={linkColor[colorMode]}>
      {children}
    </ChakraLink>
  );
};
