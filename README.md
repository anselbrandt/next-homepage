# Next.js with Express GraphQL server, in Typescript

This [Next.js](https://nextjs.org/) app uses the [chakra-ui](https://next.chakra-ui.com/) component library and [Apollo Client](https://www.apollographql.com/docs/react/) on the frontend, and [Express](https://expressjs.com/) with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) on the backend.

Next.js, chakra-ui and Apollo all have built-in TypeScript declarations, while types for Express are provided by [DefinatelyTyped](https://definitelytyped.org/).

The chakra-ui `ChakraProvider` in `/pages/_app.tsx` provides theming context, color mode (dark/light) and global styles from `theme.tsx` to all components.

## Deploy this demo

Deploy this example using [Heroku](https://www.heroku.com/) and [Vercel](https://vercel.com):

Backend:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/anselbrandt/next-express)

This application makes use of Redis for GraphQL subscriptions over websockets and requires that you provision the Heroku Redis add-on under the Resources tab of your application in the Heroku dashboard.

Make note of the URL of your deployed application.

Frontend:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/anselbrandt/next-express)

Select the web subfolder to deploy the Next.js app.

Enter the following `Environment Variables` before hitting the final `Deploy` button:

(substituting `app_name` for your actual app name)

| NAME                  | VALUE                                    |
| --------------------- | ---------------------------------------- |
| NEXT_PUBLIC_HTTP      | `https://app_name.herokuapp.com/graphql` |
| NEXT_PUBLIC_WEBSOCKET | `wss://app_name.herokuapp.com/graphql`   |
| NEXT_PUBLIC_API_URL   | `https://app_name.herokuapp.com`         |

## How to use

### Using `npx degit`

Execute [`npx degit`](https://github.com/Rich-Harris/degit) to bootstrap this example:

```bash
npx degit https://github.com/anselbrandt/next-express next-express
```

Then:

```
cd next-express
yarn
or
npm install
```

## Server:

In separate terminal tabs or windows:

```
yarn watch
then
yarn dev
```

## Frontend:

In another terminal tab or window:

```
cd web
yarn
or
npm install
```

Then:

```
yarn dev
or
yarn build
```

or

```
npm start
or
npm run-script build
```

## Setup

GraphQL server endpoints may be configured in `/web/constants.ts` and `/web/.env.local` ensuring to prefix variables with `NEXT_PUBLIC_` as in the `/web/sample.env.local` file.

The GraphQL client can be configured in `web/src//utils/withApollo.ts`

## GraphQL

Queries must be named:

```
query QueryName {
  ...
}
```

After adding any new queries to the `/web/src/graphql/` folder, execute:

```
yarn gen
or
npm run-script gen
```

[GraphQL code generator](https://graphql-code-generator.com/) will connect to your GraphQL server, generate typings based on your schema and output custom `hooks` to `/web/src/generated/graphql.tsx`.

Ensure that `/web/codegen.yml` contains the correct URL for your GraphQL server and path to your queries.

Queries can be imported as:

```
import { useQueryName } from "../generated/graphql";
...
const { data, loading, error } = useQueryName();
```
