import { Link as ChakraLink, Button, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { EMAIL, CODE_REPO } from "../../constants";

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
      pb={2}
      backgroundColor={bgColor[colorMode]}
    >
      <NextLink href={`mailto:${EMAIL}`} passHref>
        <Button
          as="a"
          width="100%"
          variant="outline"
          colorScheme={defaultColor}
          flexGrow={1}
          mx={2}
        >
          contact
        </Button>
      </NextLink>

      <NextLink href={CODE_REPO} passHref>
        <Button
          as="a"
          width="100%"
          variant="solid"
          colorScheme={defaultColor}
          flexGrow={3}
          mx={2}
        >
          view code
        </Button>
      </NextLink>
    </Container>
  );
};
