import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/cookieTest">cookieTest</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        Test Page
      </Box>
    </Container>
  );
};

export default Test;
