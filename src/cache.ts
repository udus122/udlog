import { createHash } from "node:crypto";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
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

export const readCache = async <T>(path: PathLike): Promise<T> => {
  return JSON.parse(await readFile(path, "utf8"));
};

export const writeCache = async (
  file: string,
  data: unknown
): Promise<void> => {
  createDirIfNotfound(dirname(file));
  writeFile(file, JSON.stringify(data), "utf8");
};

export const isAvailableCache = (path: PathLike, ttl: number): boolean => {
  const { mtime } = statSync(path);
  return Date.now() < mtime.getTime() + ttl;
};

export const withCache = <Args, Item>(
  func: (args: Args) => Item | Promise<Item>,
  ttl: number = 0,
  cacheDir: string = ".cache"
): ((args: Args) => Promise<Item>) => {
  const funcWithCache = async (args: Args): Promise<Item> => {
    const key = hash(JSON.stringify({ func: func.name, args }));
    const cachePath = `${cacheDir}/${key}`;

    try {
      if (isAvailableCache(cachePath, ttl)) {
        const cache = readCache<Item>(cachePath);
        return cache;
      }
    } catch (_) {
      /* not fatal */
    }

    const res = await func({ ...args });
    writeCache(cachePath, res);
    return res;
  };

  return funcWithCache;
};