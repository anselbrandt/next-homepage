import { Box, useColorMode } from "@chakra-ui/core";

interface NavbarProps {
  defaultColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ defaultColor, children }) => {
  const { colorMode } = useColorMode();
  const linkColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };
  const bgColor = { light: "gray.50", dark: "gray.900" };
  return (
    <Box
      color={linkColor[colorMode]}
      bg={bgColor[colorMode]}
      position="sticky"
      mt="1rem"
      mr="6rem"
      ml="auto"
    >
      {children}
    </Box>
  );
};
