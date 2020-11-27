import { Box, Link as ChakraLink, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";
import { useMeQuery } from "../generated/graphql";
import { useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { COOKIE_NAME } from "../../constants";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data } = useMeQuery();
  return (
    <Container minHeight="100vh">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Box mt="30vh" maxW="48rem">
        <Box>
          {data?.me ? `logged in as ${data?.me?.username}` : "not logged in"}
        </Box>
      </Box>
      {data?.me ? (
        <Button
          colorScheme={defaultColor}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
            document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      ) : null}
    </Container>
  );
};

export default withApollo({ ssr: true })(Test);
