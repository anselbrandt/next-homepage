import React, { useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Code,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import Grid from "../animation/Grid";
import { useGetViewport } from "../hooks/useGetViewport";

interface IndexProps {
  defaultColor: string;
}

const Index: React.FC<IndexProps> = ({ defaultColor }) => {
  const { width } = useGetViewport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const min = Math.min(width! * 0.55, 600);

  return (
    <Container>
      <Navbar defaultColor={defaultColor} />
      <Box mt="10vw">
        <Heading fontSize="5vw">Ansel Brandt</Heading>
      </Box>
      <Box width="75vw" mt="5vw" maxWidth="750px">
        <Text textAlign="center">
          Building fullstack web applications with <Code>React</Code> +{" "}
          <Code>Node.js</Code> + <Code>TypeScript</Code>
        </Text>
      </Box>
      <Box mt="4vw" mb="20vh">
        <Grid
          canvasRef={canvasRef}
          width={min}
          height={min}
          defaultColor={defaultColor}
        />
      </Box>
      <Flex position="absolute" bottom="0" right="0" mr={2} mb={2}>
        <Text fontSize="xs" color="tomato">
          {" "}
          (react clone of{" "}
          <ChakraLink href="https://tixy.land/" textDecor="underline">
            tixy.land
          </ChakraLink>
          )
        </Text>
      </Flex>
    </Container>
  );
};

export default Index;
