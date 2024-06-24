import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const DB_PLAYER = "mongodbVSCodePlaygroundDB";
const PLAYER_COLLECTION = "players";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { username }, body } = req;

  const client = await clientPromise;
  const db = client.db(DB_PLAYER);
  const playersCollection = db.collection(PLAYER_COLLECTION);


  switch (method) {
    case "GET":
      try {
        const userFound = await playersCollection.findOne({ username });
        if (!userFound) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userFound);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        if (!body || !body.username) {
          return res.status(400).json({ message: "Invalid request body" });
        }

        const existingUser = await playersCollection.findOne({ username: body.username });
        console.log('exustubg', existingUser)
        if (existingUser != null) {
          return res.status(409).json({ message: "User already exists" });
        }

        await playersCollection.insertOne(body);
        res.status(201).json({ message: "User created" });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
