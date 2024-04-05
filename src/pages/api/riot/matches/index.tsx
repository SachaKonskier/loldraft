import { IChampionOutput } from "@/types/champions/champions";
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
  const id = puuid;
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
      `${riotUrl}/by-puuid/${puuid}/ids?start=0&count=30&api_key=${apiKey}`
    ).then((response) => response.json());

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleMatchesByIds(
  matches: string,
  puuid: string,
  res: NextApiResponse
) {
  const stringToMatchesArray = matches.split(",");

  try {
    const results: IChampionOutput[] = [];
    for (let match of stringToMatchesArray) {
      const res = await fetch(`${riotUrl}/${match}?api_key=${apiKey}`).then(
        (response) => response.json()
      );
      const filteredDataByPuuid = res.info.participants

        .filter((participant: any) => participant.puuid === puuid)
        .map((element: any) =>  ({
          championName: element.championName,
          championId: element.championId,
          death: element.deaths,
          position: element.teamPosition,
          kills: element.kills,
          summonerName: element.riotIdGameName,
          assists: element.assists,
          minionsKilled: element.totalMinionsKilled,
          neutralMinionsKilled: element.neutralMinionsKilled,
          win: element.win,
          timePlayed: element.timePlayed,
          partyType: res.info.gameMode,
          kda: parseFloat(((element.kills + element.assists) / element.deaths).toFixed(2)),
          killParticipation: getKillParticipation(res.info.participants, puuid),
          csPerMinute: parseFloat((element.totalMinionsKilled / (element.timePlayed / 60)).toFixed(2)),
          gameType: res.info.gameType
        }))
        .filter((element: any) => element.partyType !== "ARAM");
      results.push(...filteredDataByPuuid);
    }
    res.send(results  );
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getKillParticipation(participants: any[], puuid: string) {
  const player = participants.find((participant) => participant.puuid === puuid);
  const team = participants.filter((participant) => participant.teamId === player.teamId);
  const teamKills = team.reduce((acc, participant) => acc + participant.kills, 0);
  return parseFloat(((player.kills + player.assists) / teamKills).toFixed(2)) * 100 + '%' ;
}

function mergeData(data: IChampionOutput[]) {
  return data.reduce((acc: { [key: string]: any }, curr) => {
    const { championId, championName, summonerName, partyType, ...rest } = curr;
    if (!acc[championId]) {
      acc[championName] = {
        championId,
        championName,
        summonerName,
        partyType,
        matches: [rest],
      };
    } else {
      acc[championId].matches.push(rest);
    }
    return acc;
  }, {});
}