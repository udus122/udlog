import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, statSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path/posix";
import { cwd } from "node:process";

import type { BinaryLike } from "node:crypto";
import type { PathLike } from "node:fs";

export const hash = (data: BinaryLike): string => {
  const shasum = createHash("md5");
  shasum.update(data);
  return shasum.digest("hex");
};

export const createDirIfNotfound = (path: PathLike): void => {
  const absolutePath = join(cwd(), path.toString());
  if (!existsSync(absolutePath)) {
    mkdirSync(absolutePath, { recursive: true });
  }
};

export const readCache = async <T>(path: PathLike): Promise<T> => {
  const absolutePath = join(cwd(), path.toString());
  return JSON.parse(await readFile(absolutePath, "utf8"));
};

export const writeCache = async (
  file: string,
  data: unknown
): Promise<void> => {
  createDirIfNotfound(dirname(file));
  writeFile(file, JSON.stringify(data), "utf8");
};

export const isAvailableCache = (path: PathLike, ttl: number): boolean => {
  const absolutePath = join(cwd(), path.toString());

  if (!existsSync(absolutePath)) {
    return false;
  }

  const { mtime } = statSync(absolutePath);
  return Date.now() < mtime.getTime() + ttl;
};

export const withCache = <Args, Item>(
  func: (args: Args) => Item | Promise<Item>,
  ttl: number = 0,
  cacheDir: string = ".cache"
): ((args: Args) => Promise<Item>) => {
  const funcWithCache = async (args: Args): Promise<Item> => {
    const key = hash(JSON.stringify({ func: func.name, args }));
    const tmpDir = mkdtempSync(cacheDir);
    const cachePath = `${tmpDir}/${key}`;

    try {
      if (isAvailableCache(cachePath, ttl)) {
        const cache = readCache<Item>(cachePath);
        console.log(`cache hit: ${cachePath}`);
        return cache;
      }
    } catch (_) {
      /* not fatal */
    }
    console.log(
      `call ${func.name} parameter: ${JSON.stringify({
        args,
      })}`
    );
    const res = await func({ ...args });
    writeCache(cachePath, res);
    console.log(`cache created: ${cachePath}`);
    return res;
  };

  return funcWithCache;
};
