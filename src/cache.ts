import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path/posix";

import type { BinaryLike } from "node:crypto";
import type { PathLike } from "node:fs";

export const hash = (data: BinaryLike): string => {
  const shasum = createHash("md5");
  shasum.update(data);
  return shasum.digest("hex");
};

export const createDirIfNotfound = (path: PathLike): void => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

export const readCache = <T>(path: PathLike): T => {
  return JSON.parse(readFileSync(path, "utf8"));
};

export const writeCache = (file: string, data: unknown): void => {
  createDirIfNotfound(dirname(file));
  writeFileSync(file, JSON.stringify(data), "utf8");
};

export const isAvailableCache = (path: PathLike, ttl: number): boolean => {
  const { mtime } = statSync(path);
  return Date.now() < mtime.getTime() + ttl;
};

export const withCache = <Args, Item>(
  func: (args: Args) => Item,
  cacheDir: string = ".cache"
): ((args: Args) => Item) => {
  const funcWithCache = (args: Args): Item => {
    const key = hash(JSON.stringify({ func: func.name, args }));
    const cachePath = `${cacheDir}/${key}`;

    try {
      if (isAvailableCache(cachePath, 600)) {
        const cache = readCache<Item>(cachePath);
        return cache;
      }
    } catch (_) {
      /* not fatal */
    }

    const res = func({ ...args });
    writeCache(cachePath, res);
    return res;
  };

  return funcWithCache;
};
