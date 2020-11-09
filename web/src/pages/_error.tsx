import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import useFetch from "../hooks/useFetch";

interface IndexProps {
  defaultColor: string;
}

const Index: React.FC<IndexProps> = ({ defaultColor }) => {
  const { data, error } = useFetch();

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        {error ? "Whoops." : data}
      </Box>
    </Container>
  );
};

export default Index;
