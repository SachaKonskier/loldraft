// React
import { useState } from "react";
// Icons
import PlayerCardComponent from "@/components/playerCard";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// Components
import ChampionsList from "@/components/championsContent/championsList";
import SearchPlayer from "@/components/search/searchPlayer";
// Utils
import { mostPlayedPosition } from "@/utils/utils";
// Types
import { IChampionDisplayedData } from "@/types/champions/champions";

export default function HomePage() {
  const [players, setPlayers] = useState<string[]>([]);

  const [data, setData] = useState<any>();
  const handleDataUpdate = (newData: any) => {
    setData(newData);
  };

  const handlePlayersUpdate = (newPlayers: any) => {
    setPlayers(newPlayers);
  };

  const pickRate = (data: IChampionDisplayedData) =>
    ((data.totalGames / data.totalFetchedGames) * 100).toFixed(0);
  // find most played position for all champions
  const findPosition =
    data &&
    Object.values(data)
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
          <SearchPlayer
            onDataUpdate={handleDataUpdate}
            onPlayersUpdate={handlePlayersUpdate}
          />
        </div>

        {players.map((player: any) => (
          <div key={player.puuid} className="px-8 py-5">
            <PlayerCardComponent player={player} />
          </div>
        ))}
      </div>
     
      {!data && (
        <div className="bg-darkGray h-full w-full font-bold flex flex-col gap-20 py-36 text-9xl ">
          <div className="uppercase text-gray-500 w-full font-outfit flex justify-end italic">no players</div>
          <div className="uppercase text-white font-outfit flex justify-center italic">no players</div>
          <div className="uppercase text-gray-500 font-outfit flex justify-start italic">no players</div>
        </div>
      )}
      
      {data && (
        <ChampionsList
          data={data}
          pickRate={pickRate}
          position={position}
          player={players[0]}
        />
      )}
    </div>
  );
}
