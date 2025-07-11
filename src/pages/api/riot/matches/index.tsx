import clientPromise from "@/lib/mongodb";
import { IRefinedChampionOutput } from "@/types/matches/matches";
import { NextApiRequest, NextApiResponse } from "next";
const riotUrl = "https://europe.api.riotgames.com/lol/match/v5/matches";
const apiKey = process.env.RIOT_API_KEY;

const DDRAGON_VERSION = "15.13.11";

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
    const result: string[] = await fetch(
      `${riotUrl}/by-puuid/${puuid}/ids?type=ranked&start=0&count5&api_key=${apiKey}`,
      {
        method: "GET",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleMatchesByIds(
  matches: any,
  puuid: string,
  res: NextApiResponse
) {
  const stringToMatchesArray = matches.split(",");

  try {
    const results: IRefinedChampionOutput[] = [];
    for (let match of stringToMatchesArray) {
      let res: any;

      res = await fetch(`${riotUrl}/${match}?api_key=${apiKey}`).then(
        (response) => response.json()
      );

      const filteredDataByPuuid = res.info.participants
        .filter((participant: any) => participant.puuid === puuid)
        .map((element: any) => ({
          championName: element.championName,
          championId: element.championId,
          summonerPuuid: element.puuid,
          profileIcon: element.profileIcon,
          gameEndedInEarlySurrender: element.gameEndedInEarlySurrender,
          death: element.deaths,
          position: element.teamPosition,
          kills: element.kills,
          summonerName: element.riotIdGameName,
          assists: element.assists,
          minionsKilled:
            element.totalMinionsKilled + element.neutralMinionsKilled,
          win: element.win,
          timePlayed: element.timePlayed,
          partyType: res.info.gameMode,
          kda: getKda(element.kills, element.deaths, element.assists),
          killParticipation: getKillParticipation(res.info.participants, puuid),
          csPerMinute: parseFloat(
            (
              (element.totalMinionsKilled + element.neutralMinionsKilled) /
              (element.timePlayed / 60)
            ).toFixed(2)
          ),
          gameType: res.info.gameType,
          visionScore: element.visionScore,
        }))
        ?.filter(
          (element: any) =>
            element.partyType !== "ARAM" &&
            element.partyType !== "URF" &&
            !element.gameEndedInEarlySurrender
        );
      console.log(filteredDataByPuuid);
      results.push(...filteredDataByPuuid);
      // const client = await clientPromise
      // const db = client.db("smart_draft")
      // const collection = db.collection("matchs")
      // const results: IRefinedChampionOutput[] = [];
      // for (let match of stringToMatchesArray) {
      //   let res: any
      //   const matchFound = await collection.findOne({id: match})
      //   if(!matchFound){
      //     res = await fetch(`${riotUrl}/${match}?api_key=${apiKey}`).then(
      //     (response) => response.json()
      //     )
      //     if(res) {
      //       await collection.insertOne({id : match, data: res })
      //     }
      //   } else {
      //     res = matchFound.data
      //   }
      //   const filteredDataByPuuid = res.info.participants
      //     .filter((participant: any) => participant.puuid === puuid)
      //     .map((element: any) => ({
      //       championName: element.championName,
      //       championId: element.championId,
      //       summonerPuuid: element.puuid,
      //       profileIcon: element.profileIcon,
      //       gameEndedInEarlySurrender: element.gameEndedInEarlySurrender,
      //       death: element.deaths,
      //       position: element.teamPosition,
      //       kills: element.kills,
      //       summonerName: element.riotIdGameName,
      //       assists: element.assists,
      //       minionsKilled:
      //         element.totalMinionsKilled + element.neutralMinionsKilled,
      //       win: element.win,
      //       timePlayed: element.timePlayed,
      //       partyType: res.info.gameMode,
      //       kda: getKda(element.kills, element.deaths, element.assists),
      //       killParticipation: getKillParticipation(res.info.participants, puuid),
      //       csPerMinute: parseFloat(
      //         ((element.totalMinionsKilled + element.neutralMinionsKilled) / (element.timePlayed / 60)).toFixed(2)
      //       ),
      //       gameType: res.info.gameType,
      //       visionScore: element.visionScore,
      //     }))
      //     ?.filter(
      //       (element: any) =>
      //         element.partyType !== "ARAM" && element.partyType !== "URF" && !element.gameEndedInEarlySurrender
      //     );
      //     console.log(filteredDataByPuuid)
      //   results.push(...filteredDataByPuuid);
    }
    // Sort the array based on winrate (totalGame / totalFetchedGame * 100)
    const championsArray = Object.entries(mergeData(results));

    championsArray.sort((a: any, b: any) => {
      const winrateA = (a[1].totalGames / a[1].totalFetchedGames) * 100;
      const winrateB = (b[1].totalGames / b[1].totalFetchedGames) * 100;
      return winrateB - winrateA; // Descending order (highest winrate first)
    });

    // Convert the array back to an object
    const sortedChampionsData = Object.fromEntries(championsArray);

    res.send(sortedChampionsData);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function getKillParticipation(participants: any[], puuid: string) {
  const player = participants.find(
    (participant) => participant.puuid === puuid
  );
  const team = participants.filter(
    (participant) => participant.teamId === player.teamId
  );
  const teamKills = team.reduce(
    (acc, participant) => acc + participant.kills,
    0
  );
  if (player.kills === 0 && player.assists === 0 && teamKills === 0) return 0;
  return parseFloat(
    (((player.kills + player.assists) / teamKills) * 100).toFixed(2)
  );
}
function getKda(kills: number, deaths: number, assists: number) {
  if (deaths === 0) {
    return ((kills + assists) / 1).toFixed(2);
  }
  return ((kills + assists) / deaths).toFixed(2);
}
function mergeData(data: IRefinedChampionOutput[]) {
  const result = data.reduce((acc: any, curr: any) => {
    const champion = acc[curr.championName];
    if (champion) {
      champion.summonerPuuid = curr.summonerPuuid;
      champion.profileIcon = curr.profileIcon;
      champion.gameEndedInEarlySurrender = curr.gameEndedInEarlySurrender;
      champion.name = curr.championName;
      champion.id = curr.championId;
      champion.kills += curr.kills;
      champion.deaths += curr.death;
      champion.assists += curr.assists;
      champion.minionsKilled += curr.minionsKilled;
      champion.timePlayed += curr.timePlayed;
      champion.csPerMinute += curr.csPerMinute;
      champion.kda += curr.kda;
      champion.killParticipation += curr.killParticipation;
      champion.totalGames++;
      champion.wins += curr.win ? 1 : 0;
      champion.losses += curr.win ? 0 : 1;
      champion.positions.push(curr.position);
      champion.visionScore += curr.visionScore;
    } else {
      acc[curr.championName] = {
        summonerPuuid: curr.summonerPuuid,
        profileIcon: curr.profileIcon,
        gameEndedInEarlySurrender: curr.gameEndedInEarlySurrender,
        name: curr.championName,
        id: curr.championId,
        kills: curr.kills,
        deaths: curr.death,
        assists: curr.assists,
        minionsKilled: curr.minionsKilled,
        timePlayed: curr.timePlayed,
        csPerMinute: curr.csPerMinute,
        kda: curr.kda,
        killParticipation: curr.killParticipation,
        totalGames: 1,
        wins: curr.win ? 1 : 0,
        losses: curr.win ? 0 : 1,
        positions: [curr.position],
        visionScore: curr.visionScore,
      };
    }
    return acc;
  }, {});

  for (const champion in result) {
    const stats = result[champion];
    const profileLink = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/profileicon/${stats.profileIcon}.png`;
    stats.csPerMinute = (stats.csPerMinute / stats.totalGames).toFixed(2);
    stats.kda = (stats.kda / stats.totalGames).toFixed(2);
    stats.killParticipation = (
      stats.killParticipation / stats.totalGames
    ).toFixed(2);
    stats.winrate = ((stats.wins / stats.totalGames) * 100).toFixed(2);
    stats.championImg = `/assets/champion/${stats.name}.png`;
    stats.championBgImg = `/assets/background/${stats.name}.jpg`;
    stats.profileIcon = profileLink;
    stats.totalFetchedGames = data.length;
    stats.visionScore = (stats.visionScore / stats.totalGames).toFixed(2);
  }

  return result;
}
