// React
import { useEffect, useState } from "react";
// Api Services
import { RiotApi } from "@/modules/riot/riot.api";
// Icons
import AddIcon from '@mui/icons-material/Add';
// Types
import { IPlayer } from "@/types/player";
import { getSummoner } from "@/utils/utils";
const TITLE = "Add a new player !";
const riotApi = RiotApi;
interface IProps {
  onDataUpdate: any;
  onPlayersUpdate: any;
}
interface Iplayer {
  summonerName: string;
  summonerAndTag: string;
}
export default function SearchPlayer({
  onDataUpdate,
  onPlayersUpdate,
}: IProps) {
  const [playerInput, setPlayerInput] = useState("");
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const handleAddPlayerCard = async () => {

    if (!checkInputFormat(playerInput)) {
      return;
    }
    const summonerPuuid = (await getSummoner(playerInput)) as any;
    if (summonerPuuid?.error && summonerPuuid.error?.includes("error")) {
      setError("We are not able to find this account");
      return;
    }
    function checkInputFormat(input: string) {
      // if the the input is more that 22 char it's not a valid input
  
      // if the input has more than one # it's not a valid input
      if (input.split("#").length > 2) {
        setError("Invalid format input: too many #");
        return false;
      }
      // if the input before the split is more that 16 char it's not a valid input
      if (input.split("#")[0].length > 16) {
        setError("Invalid format input: too long before # (max 16)");
        return false;
      }
      // if the input after the split is more that 6 char it's not a valid input
      if (input.split("#")[0].length <=16 && input.split("#")[1].length > 5) {
        setError("Invalid format input: too long after # (max 5)");
        return false;
      }
      return true;
    }
    if (summonerPuuid?.puuid) {
      setPlayers([
        ...players,
      summonerPuuid
      ]);
      setError(null);
      const matches = (await riotApi.getRawMatchList(
        summonerPuuid?.puuid
      )) as any;
      const filteredMatches = await riotApi.getFilteredMatchList(
        summonerPuuid?.puuid,
        matches
      );
      setData(filteredMatches);
    } else {
      return;
    }
  };
  useEffect(() => {
    onPlayersUpdate(players);
    onDataUpdate(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, data]);
  function handleKeyPressed(event: any) {
    if (event.key === "Enter") {
      handleAddPlayerCard();
    }
  }

  return (
    <div className="max-w-[320px] p-3 bg-gradient-to-r from-light-green to-transparent rounded-lg border border-light-green h-full w-full">
      <h1 className="text-base font-bold italic font-outfit text-white pb-3">
        {TITLE}
      </h1>
      <div className="relative">
        <input
          type="text"
          className={`w-full h-auto font-normal placeholder:text-gray-600 bg-white/40 px-3 py-2 text-gray-600 rounded-lg focus:outline-none caret-light-green ${
            error ? "text-red-500" : ""
          }`}
          placeholder="Game Name + #EX"
          value={playerInput}
          onChange={(e) => {
            setPlayerInput(e.target.value);
            setError(null);
          }}
          onKeyUp={(event) => handleKeyPressed(event)}
        />

        <span className="absolute top-2 inset-y-0 right-0 pr-4 ">
          <button
            className="hover:animate-pulse hover:scale-110"
            disabled={playerInput.length === 0}
            type="submit"
            onClick={() => handleAddPlayerCard()}
          >
            <AddIcon className="text-white rotate-90" />
          </button>
        </span>
      </div>
      {error && (
        <div className="text-red-500 py-2 italic text-sm font-outfit">
          {error}
        </div>
      )}
    </div>
  );
}
