import { Client } from "@notionhq/client";

import { withCache } from "./cache";

export const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

const handler: ProxyHandler<Client> = {
  get: (target: Client, propertyKey: PropertyKey) => {
    const property = Reflect.get(target, propertyKey);
    return new Proxy(property, handler);
  },

  apply: (target, thisArg, argumentsList) => {
    // @ts-expect-error: Client itself is not callable. but target here is client property and these are callable.
    return withCache(target).apply(thisArg, argumentsList);
  },
};

export const memoClient = new Proxy(client, handler);
