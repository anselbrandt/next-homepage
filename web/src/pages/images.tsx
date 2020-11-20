import { Box, Link as ChakraLink, Heading } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import useTokenFetch from "../hooks/useTokenFetch";
import { allsubs } from "../subs";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  const { token } = useTokenFetch();
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>Images</Box>
        <Box>{token}</Box>
        {allsubs.map((value, index) => (
          <Box key={index}>
            <Heading>{value.category}</Heading>
            <Box>
              {value.subs.map((value, index) => (
                <Box key={index}>
                  <ChakraLink href={`/images/${value}`}>{value}</ChakraLink>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Images;
