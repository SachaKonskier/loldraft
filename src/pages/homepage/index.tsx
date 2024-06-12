// React
import { useState } from "react";
// Icons
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

// Components
import ChampionsList from "@/components/championsContent/championsList";
import SearchPlayer from "@/components/search/searchPlayer";
import PlayerCardComponent from "@/components/playerCard";
// Utils
import { getMostPlayedPosition } from "@/utils/utils";
// Store
import { usePlayersStore } from "@/providers/players-store-provider";

export default function HomePage() {
  const { accounts } = usePlayersStore((state) => state);
  // TODO - get the most played position from the selected account / default is accounts[0]
  const selectedAccount = accounts[0];
  const position = getMostPlayedPosition(selectedAccount?.matches);
  const [isCollapse, setIsCollapse] = useState(false);
  const emptyResults = () => {
    return (
      <div className="bg-darkGray uppercase h-auto w-full  font-barlow text-gray-500   italic font-bold text-[200px] leading-none truncate relative">
        <div className="opacity-40">no player no player</div>
        <div className="  -right-[48%] absolute">
          no player <span className="text-white">no player</span> no player
        </div>
        <div className="  opacity-40  absolute top-[45%]">
          no player no player
        </div>
        <div className=" opacity-10 absolute top-[66%] -right-12 bg-gradient-to-b from-gray-500 to-transparent bg-clip-text text-transparent">
          no player no player
        </div>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen h-fit w-full">
      <div
        className={`w-auto bg-blue-gray h-auto pt-10 relative ${
          isCollapse ? "w-40" : "min-w-[370px] "
        } transition-all ease-in-out`}
      >
        <div className="flex items center px-8 py-5 transition-all ease-in-out">
          <button
            className={`absolute -right-2 z-10 ${
              isCollapse ? "rotate-180" : ""
            } transition-all ease-in-out`}
            onClick={() => setIsCollapse(!isCollapse)}
          >
            <KeyboardDoubleArrowRightIcon className="text-black bg-white rounded-full" />
          </button>
          <h1
            className={`uppercase text-white font-outfit ${
              isCollapse ? "text-2xl" : "text-4xl"
            } italic font-extrabold`}
          >
            smart draft
          </h1>
          {/* <button className="w-[42px] h-[42px] bg-light-green rounded-lg rotate-45 ml-auto">
            <EditOutlinedIcon className="text-white -rotate-45" />
          </button> */}
        </div>
        {!isCollapse && (
          <div className="px-8 py-5">
            {/* input field */}
            <SearchPlayer />
          </div>
        )}

        {accounts?.map((player: any) => (
          <div key={player.mainAccount.puuid} className="px-8 py-5">
            <PlayerCardComponent player={player} isCollapse={isCollapse}/>
          </div>
        ))}
      </div>
      {accounts.length === 0 && emptyResults()}

      {accounts?.map((player: any) => (
        <div key={player.mainAccount.puuid} className="w-full">
          <div className="w-full h-full">
            <ChampionsList
              data={player.matches}
              position={position}
              player={player}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
