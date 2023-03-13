import { NextApiRequest, NextApiResponse } from "next";

import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import metascraperLogoFavicon from "metascraper-logo-favicon";

const metascraper = createMetascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
  metascraperLogoFavicon(),
]);

const ApiUrlMetadata = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "GET") {
    res.statusCode = 400;
    res.end();
    return;
  }

  const { url: urls } = req.query;

  if (!urls) {
    res.statusCode = 400;
    res.end();
    return;
  }

  try {
    new URL(urls.toString());
  } catch (e) {
    console.log(e);

    res.statusCode = 400;
    res.end();
    return;
  }

  try {
    const fetched = await fetch(urls.toString());
    const html = await fetched.text();
    const metadata = await metascraper({ html, url: urls.toString() });
    if (!metadata) {
      throw new Error(`no metadata. url: ${urls}`);
    }

    res.json(metadata);
    res.statusCode = 200;
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
};

export default ApiUrlMetadata;
