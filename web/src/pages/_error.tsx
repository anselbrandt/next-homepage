import { Box } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../../constants";

interface IndexProps {
  defaultColor: string;
}

const Index: React.FC<IndexProps> = ({ defaultColor }) => {
  const [data, error] = useFetch(API_URL);

  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Box mt="30vh" maxW="48rem">
        {error ? "Whoops." : data}
      </Box>
    </Container>
  );
};

export default Index;
