import { Client } from "@notionhq/client";

import { withCache } from "./cache";

const memoizeClient = (client: Client, ttl: number, cacheDir: string) => {
  const handler: ProxyHandler<Client> = {
    get(target: Client, propertyKey: PropertyKey) {
      const property = Reflect.get(target, propertyKey);

      if (typeof property === "function") {
        return withCache(property, ttl, cacheDir);
      }

      return new Proxy(property, handler);
    },
  };
  return new Proxy(client, handler);
};

export const client = memoizeClient(
  new Client({
    auth: process.env.NOTION_TOKEN,
  }),
  24 * 60 * 60 * 1000 /* 1day */,
  ".cache"
);
