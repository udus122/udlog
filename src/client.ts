import { Client } from "@notionhq/client";
import { cache } from "react";

const _client = new Client({
  auth: process.env.NOTION_TOKEN,
});

const memoizeClient = (client: Client, ttl: number) => {
  const handler: ProxyHandler<Client> = {
    get(target: Client, propertyKey: PropertyKey) {
      const property = Reflect.get(target, propertyKey);

      if (typeof property === "function") {
        return cache(property);
      }

      return new Proxy(property, handler);
    },
  };
  return new Proxy(client, handler);
};

export const client =
  // _client;
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? memoizeClient(_client, 60 * 60 * 1000 /* 1hour */)
    : _client;
