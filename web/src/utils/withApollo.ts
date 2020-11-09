import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { HTTP, WEBSOCKET } from "../../constants";

// wsLink provides URI for graphql subscriptions

const wsLink: any =
  process.browser && WEBSOCKET
    ? new WebSocketLink({
        uri: WEBSOCKET,
        options: {
          reconnect: true,
        },
      })
    : null;

const httplink = new HttpLink({
  uri: HTTP,
  // credentials: "include",
});

const link =
  process.browser && WEBSOCKET
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httplink
      )
    : httplink;

// authLink allows for headers to be modified, eg. for bearer token inclusion

const authLink = setContext((_: any, { headers }: any) => {
  return {
    headers: {
      ...headers,
    },
  };
});

// pass link to authLink.concat() if using subscriptions

const createClient = () =>
  new ApolloClient({
    link: authLink.concat(link),
    // credentials: "include" as const,
    // headers: {}
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(createClient);
