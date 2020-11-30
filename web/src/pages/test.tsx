import { Box } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Box mt="30vh" maxW="48rem">
        <Box>Test Page</Box>
      </Box>
    </Container>
  );
};

export default Test;
