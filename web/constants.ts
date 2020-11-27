export const WEBSOCKET =
  process.env.NEXT_PUBLIC_WEBSOCKET || `ws://localhost:4000/graphql`;

export const HTTP =
  process.env.NEXT_PUBLIC_HTTP || "http://localhost:4000/graphql";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const REDDITKEY = process.env.NEXT_PUBLIC_REDDITKEY;

export const GOOGLEKEY = process.env.NEXT_PUBLIC_GOOGLEKEY;

export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "qid";
