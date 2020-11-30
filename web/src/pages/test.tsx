import { Box } from "@chakra-ui/core";
import { Layout } from "../components/Layout";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  return (
    <Layout defaultColor={defaultColor}>
      <Box mt="30vh" maxW="48rem">
        <Box>Test Page</Box>
      </Box>
    </Layout>
  );
};

export default Test;
