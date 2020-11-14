import "reflect-metadata";
import {
  __prod__,
  COOKIE_NAME,
  SECRET,
  DBUSERNAME,
  DBPASSWORD,
  DBNAME,
  REDIS_URL,
  DATABASE_URL,
  PORT,
} from "./constants";
import path from "path";
import { createConnection } from "typeorm";
import express from "express";
import session from "express-session";
import cors from "cors";
import http from "http";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { LikeResolver } from "./resolvers/like";
import { FavoriteResolver } from "./resolvers/favorite";
import { Like } from "./entities/Like";
import { User } from "./entities/User";
import { Favorite } from "./entities/Favorite";
import { createFavoriteLoader } from "./utils/createFavoriteLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url:
      DATABASE_URL ||
      `postgres://${DBUSERNAME}:${DBPASSWORD}@localhost:5432/${DBNAME}`,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Like, User, Favorite],
  });

  await conn.runMigrations();

  const redis = new Redis(REDIS_URL);

  const pubsub = new RedisPubSub({
    publisher: new Redis(REDIS_URL),
    subscriber: new Redis(REDIS_URL),
  });

  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use((req: any, _, next: any) => {
    const token = req.headers.authorization;
    if (token) {
      req.headers.cookie = `${COOKIE_NAME}=${token}`;
    }
    next();
  });

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: SECRET,
      resave: false,
    })
  );

  app.use((req: any, _, next: any) => {
    req.pubsub = pubsub;
    next();
  });

  app.get("/", (_, res) => {
    res.send("Nothing to see here.");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, LikeResolver, FavoriteResolver],
      pubSub: pubsub,
      validate: false,
    }),
    context: ({ req, res }) => {
      return {
        req,
        res,
        redis,
        pubsub,
        favoriteLoader: createFavoriteLoader(),
      };
    },
    subscriptions: {
      async onConnect(_, webSocket: any) {
        console.log(
          "connected: ",
          webSocket.upgradeReq.headers["sec-websocket-key"]
        );
      },
      async onDisconnect(webSocket: any) {
        console.log(
          "disconnected: ",
          webSocket.upgradeReq.headers["sec-websocket-key"]
        );
      },
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
});
