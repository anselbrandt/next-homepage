import { Box, Link as ChakraLink } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Navbar } from "../../components/Navbar";
import useTokenFetch from "../../hooks/useTokenFetch";

interface SubProps {
  defaultColor: string;
}

const Sub: React.FC<SubProps> = ({ defaultColor }) => {
  const router = useRouter();
  const sub = router.query.sub;
  const { token } = useTokenFetch();

  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>{sub}</Box>
        <Box>{token}</Box>
      </Box>
    </Container>
  );
};

export default Sub;
