import { Link as ChakraLink, Button, useColorMode } from "@chakra-ui/core";

import { Container } from "./Container";

interface CTAProps {
  defaultColor: string;
}

export const CTA: React.FC<CTAProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
      py={2}
    >
      <ChakraLink
        isExternal
        href="https://next.chakra-ui.com/"
        flexGrow={1}
        mx={2}
      >
        <Button
          width="100%"
          variant="outline"
          colorScheme={defaultColor}
          backgroundColor={bgColor[colorMode]}
        >
          chakra-ui
        </Button>
      </ChakraLink>

      <ChakraLink
        isExternal
        href="https://github.com/anselbrandt/next-express/"
        flexGrow={3}
        mx={2}
      >
        <Button width="100%" variant="solid" colorScheme={defaultColor}>
          View Repo
        </Button>
      </ChakraLink>
    </Container>
  );
};
