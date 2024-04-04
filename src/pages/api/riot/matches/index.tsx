import { NextApiRequest, NextApiResponse } from "next";

const riotUrl = "https://europe.api.riotgames.com/lol/match/v5/matches";
const apiKey = process.env.RIOT_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { puuid, matches, summonerPuuid },
  } = req;
  const id = puuid
  if (req.method === "GET") {
    if (puuid) {
      // Handle request for fetching matches by PUUID
      await handleMatchesByPuuid(id as string, res);
    } else if (matches) {
      // Handle request for fetching matches by match IDs
      await handleMatchesByIds(matches as any, summonerPuuid as string, res);
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function handleMatchesByPuuid(puuid: string, res: NextApiResponse) {
  try {
    const result = await fetch(
      `${riotUrl}/by-puuid/${puuid}/ids?start=0&count=1&api_key=${apiKey}`
    ).then((response) => response.json());

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleMatchesByIds(matches: string, puuid: string, res: NextApiResponse) {
   
    const stringToMatchesArray = matches.split(',');

  try {
    const results: string[] = [];
    for (let match of stringToMatchesArray) {
   const res = await fetch(`${riotUrl}/${match}?api_key=${apiKey}`).then((response) => response.json());
        const filteredDataByPuuid = res.info.participants.filter((participant: any) => participant.puuid === puuid).map((element) => ({
            championName: element.championName,
            championId: element.championId,
            death: element.deaths,
            goldEarned: element.goldEarned,
            position: element.individualPosition,
            kills: element.kills,
            lane: element.lane,
            summonerName: element.riotIdGameName,
            assists: element.assists,
            minionsKilled: element.totalMinionsKilled,
            win: element.win,
            timePlayed: element.timePlayed,
            partyType: res.info.gameMode
        }))
        console.log("filteredDataByPuuid", filteredDataByPuuid)
        results.push(...filteredDataByPuuid);
        }
    console.log("results", results);
    res.send(results);
    
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}