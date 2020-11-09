import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  useColorMode,
} from "@chakra-ui/core";
import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Hero } from "../components/Hero";
import LocalGraphql from "../components/LocalGraphql";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { links } from "../content/links";
import { Navbar } from "../components/Navbar";

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
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/404" mr="2rem">
          404
        </ChakraLink>
        <ChakraLink href="/about">About</ChakraLink>
      </Navbar>
      <Hero />
      <Main>
        <LocalGraphql defaultColor={defaultColor} />
      </Main>
      <Footer>
        <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
          <Code>graphql</Code> running on an <Code>Express</Code> +{" "}
          <Code>Apollo Server</Code> backend, all written in{" "}
          <Code>typescript</Code>
        </Text>
        <List spacing={3} my={0}>
          {links.map((link, index) => (
            <ListItem key={index}>
              <ListIcon as={CheckCircleIcon} color={themeColor[colorMode]} />
              <ChakraLink isExternal href={link.path} flexGrow={1} mr={2}>
                {link.name} <ExternalLinkIcon />
              </ChakraLink>
            </ListItem>
          ))}
        </List>
      </Footer>
      <CTA defaultColor={defaultColor} />
    </Container>
  );
};

export default Index;
