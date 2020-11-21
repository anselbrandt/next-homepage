import { Box, Link as ChakraLink, Heading, SimpleGrid } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import { allsubs } from "../subs";

interface ImagesProps {
  defaultColor: string;
}

const Images: React.FC<ImagesProps> = ({ defaultColor }) => {
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box width="100%" maxWidth="1000px">
        <SimpleGrid mx="8" minChildWidth="180px">
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
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Images;
