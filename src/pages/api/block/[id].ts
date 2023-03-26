import { NextApiRequest, NextApiResponse } from "next";

import { retrieveBlock } from "@/libs/notion/block";

const ApiBlock = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.statusCode = 400;
    res.end();
    return;
  }

  const { id } = req.query;

  if (!id) {
    res.statusCode = 400;
    res.end();
    return;
  }

  try {
    const block = await retrieveBlock({ block_id: id.toString() });
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(block));
    res.statusCode = 200;
    res.end();
  } catch (error) {
    console.error(error);
    res.write(JSON.stringify(error));
    res.statusCode = 200;
    res.end();
  }
};

export default ApiBlock;
