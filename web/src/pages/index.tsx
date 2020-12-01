import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  useColorMode,
} from "@chakra-ui/core";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Hero } from "../components/Hero";
import LocalGraphql from "../components/LocalGraphql";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { links } from "../content/links";
import Navbar from "../components/Navbar";

interface IndexProps {
  defaultColor: string;
}

const Index: React.FC<IndexProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const themeColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };

  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Hero />
      <Main>
        <Text>
          Building the future with <Code>React</Code> + <Code>Node.js</Code> +{" "}
          <Code>TypeScript</Code>
        </Text>

        <List spacing={3} my={0} mt={4}>
          {links.map((link, index) => (
            <ListItem key={index}>
              <ListIcon as={CheckCircleIcon} color={themeColor[colorMode]} />
              <ChakraLink href={link.path} flexGrow={1} mr={2}>
                {link.name}
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Main>
      <Footer>
        <LocalGraphql defaultColor={defaultColor} />
      </Footer>
      <CTA defaultColor={defaultColor} />
    </Container>
  );
};

export default Index;
