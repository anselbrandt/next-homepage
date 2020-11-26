import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { HTTP, WEBSOCKET } from "../../constants";
import { NextPageContext } from "next";

// wsLink provides URI for graphql subscriptions

const wsLink: any = process.browser
  ? new WebSocketLink({
      uri: WEBSOCKET,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: HTTP,
  credentials: "include",
});

const link = process.browser
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
  const cookie =
    typeof document !== "undefined" && document.cookie
      ? document.cookie
          .split("; ")
          .find((row: any) => row.startsWith("qid"))!
          .split("=")[1]
      : undefined;
  return {
    headers: {
      ...headers,
      authorization: cookie ? cookie : "",
    },
  };
});

// pass link to authLink.concat() if using subscriptions

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link: authLink.concat(link),
    credentials: "include" as const,
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(createClient);
