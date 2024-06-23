import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "@/lib/mongodb";
const DB_PLAYER = "mongodbVSCodePlaygroundDB";
const PLAYER_COLLECTION = "players";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { username },
  } = req;
  if (req.method === "GET") {
    return await clientPromise.then(async (client) => {
      const db = client.db(DB_PLAYER);
      const collection = db.collection(PLAYER_COLLECTION);
      const userFound = await collection.findOne({ username });
      if (!userFound) {
        return;
      }
      res.send(userFound);
    });
  }
}

