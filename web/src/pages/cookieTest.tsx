import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";

interface CookieTestProps {
  defaultColor: string;
}

const CookieTest: React.FC<CookieTestProps> = ({ defaultColor }) => {
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/cookieTest">cookieTest</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        Cookie Test
      </Box>
    </Container>
  );
};

export default CookieTest;
