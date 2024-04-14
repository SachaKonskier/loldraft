import PlayerCardComponent from "@/components/playerCard";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useState } from "react";

import { IChampionDisplayedData } from "@/types/champions/champions";
import { mostPlayedPosition } from "@/utils/utils";
import ChampionsList from "@/components/championsContent/championsList";
import SearchPlayer from "@/components/search/searchPlayer";

export default function HomePage() {

  const [players, setPlayers] = useState<string[]>([]);

  const [data, setData] = useState<any>();
  const handleDataUpdate = (newData: any) => {
    setData(newData);
  };

  const handlePlayersUpdate = (newPlayers: any) => {
    setPlayers(newPlayers);
  };
  //  store the input value in the state players
  // const handleAddPlayerCard = async () => {
  //   const summonerPuuid = (await getSummoner()) as any;
  //   if (summonerPuuid?.error && summonerPuuid.error?.includes("error")) {
  //     setError("We are not able to find this account");
  //     return;
  //   }
  //   if (summonerPuuid?.puuid) {
  //     setPlayers([
  //       ...players,
  //       `${summonerPuuid.gameName}#${summonerPuuid.tagLine}`,
  //     ]);
  //     setError(null);
  //     const matches = (await riotApi.getRawMatchList(
  //       summonerPuuid?.puuid
  //     )) as any;
  //     const filteredMatches = await riotApi.getFilteredMatchList(
  //       summonerPuuid?.puuid,
  //       matches
  //     );
  //     setData(filteredMatches);
  //   } else {
  //     return;
  //   }
  // };
  // function handleKeyPressed(event: any) {
  //   if (event.key === "Enter") {
  //     handleAddPlayerCard();
  //   }
  // }
  // async function getSummoner() {
  //   const summonerName = playerInput.split("#")[0];
  //   const summonerTag = playerInput.split("#")[1];
  //   const res = await riotApi.getSummonerPuuid(summonerName, summonerTag);

  //   return res;
  // }
  const pickRate = (data: IChampionDisplayedData) =>
    ((data.totalGames / data.totalFetchedGames) * 100).toFixed(0);
  // find most played position for all champions
  const findPosition = data && Object.values(data)
    .map((champion: any) => champion.positions)
    .flat();
  const position = mostPlayedPosition(findPosition).position;
  console.log(position);
  return (
    <div className="flex h-screen w-full">
      <div className="w-auto min-w-[370px] bg-blue-gray h-auto pt-10">
        <div className="flex items center px-8 py-5">
          <h1 className="uppercase text-white font-outfit text-5xl italic font-extrabold">
            players
          </h1>
          <button className="w-[42px] h-[42px] bg-light-green rounded-lg rotate-45 ml-auto">
            <EditOutlinedIcon className="text-white -rotate-45" />
          </button>
        </div>
        <div className="px-8 py-5">
          {/* input field */}
          <SearchPlayer onDataUpdate={handleDataUpdate} onPlayersUpdate={handlePlayersUpdate} />
  
        </div>

        {players.map((player) => (
          <div key={player} className="px-8 py-5">
            <PlayerCardComponent player={player} />
          </div>
        ))}
      </div>
      {data && (
       <ChampionsList data={data} pickRate={pickRate} position={position} player={players[0]}/>
      )}
    </div>
  );
}
