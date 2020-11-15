import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createFavoriteLoader } from "./utils/createFavoriteLoader";

export type MyContext = {
  req: Request & { session: Express.Session };
  redis: Redis;
  res: Response;
  favoriteLoader: ReturnType<typeof createFavoriteLoader>;
};
