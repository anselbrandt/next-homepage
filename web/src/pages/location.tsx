import { Box } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import useGetLocation from "../hooks/useGetLocation";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const { location } = useGetLocation();
  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Box mt="30vh" maxW="48rem">
        <Box>{location ? JSON.stringify(location) : null}</Box>
      </Box>
    </Container>
  );
};

export default Test;
