import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
const riotUrl =
  "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const apiKey = process.env.RIOT_API_KEY;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { summonerName, summonerTag },
  } = req;
  if (req.method === "GET") {
   // const client = await clientPromise;
   // const db = client.db("smart_draft");
    // const collection = db.collection("summoners");
    let result;
    // const summonerFound = await collection.findOne({
    //   summoner: `${summonerName}#${summonerTag}`,
    // });
   // if (!summonerFound) {
      result = await fetch(
        `${riotUrl}/${summonerName}/${summonerTag}?api_key=${apiKey}`,
        {
          method: "GET",
          redirect: "follow",
        }
      ).then((response) => response.json());
      // if(result) {
      //   await collection.insertOne({
      //     summoner: `${summonerName}#${summonerTag}`,
      //     updatedDate: new Date(),
      //     data: result,
      //   });
      // }
    // } else {
    //   result = summonerFound.data;
    // }
    res.send(result);
  } else {
    res.status(405).send({ message: "Method Not Allowed" });
  }
}
