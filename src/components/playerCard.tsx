// React & Next
import Image from "next/image";
import { useState } from "react";
// Icons & Svg
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import topSvg from "../../public/top.svg";
import jungleSvg from "../../public/jungle.svg";
import midSvg from "../../public/middle.svg";
import adcSvg from "../../public/adc.svg";
import supportSvg from "../../public/support.svg";
// Types
import { IPlayer } from "@/types/player";
// Utils
import { getMostPlayedPosition, getSummoner } from "@/utils/utils";
// Store
import { usePlayersStore } from "@/providers/players-store-provider";
import { ISearchAccounts } from "@/stores/players-store";
// Api Services
import { RiotApi } from "@/modules/riot/riot.api";
import { IMatch } from "@/types/matches/matches";

const riotApi = RiotApi;
export default function PlayerCardComponent({
  player,
  isCollapse,
}: {
  player: ISearchAccounts;
  isCollapse: boolean;
}) {
  const [playerInput, setPlayerInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [error, setError] = useState<any>();
  const {
    accounts,
    addMainAccount,
    addSubAccount,
    removeMainAccount,
    removeSubAccount,
    addMatches,
    updateMatches,
  } = usePlayersStore((state) => state);

  async function getMatchesData(accountType: string) {
    if (accountType === "main") {
      const matches = (await riotApi.getRawMatchList(
        player.mainAccount.puuid
      )) as any;
      const filteredMatches = (await riotApi.getFilteredMatchList(
        player.mainAccount.puuid,
        matches
      )) as IMatch[];
      addMatches(player?.mainAccount?.puuid, filteredMatches);
    }

    if (accountType === "sub") {
  
      const matches = (await riotApi.getRawMatchList(
        player?.subAccounts[0]?.puuid
      )) as any;
   
      const filteredMatches = (await riotApi.getFilteredMatchList(
        player?.subAccounts[0]?.puuid,
        matches
      )) as IMatch[];
      setIsFetch(true);
   
      updateMatches(player?.mainAccount?.puuid, filteredMatches);
     
    }
  }
  if (player?.mainAccount?.puuid && player?.matches?.length === 0) {
  
    getMatchesData("main");
  }

  const handleSubAccountOnClick = async () => {
    const summoner = (await getSummoner(playerInput)) as any;
    if (summoner?.error && summoner.error?.includes("error")) {
      setError("We are not able to find this account");
      return;
    }
    if (
      player.mainAccount.puuid === summoner.puuid ||
      player.subAccounts.some((acc) => acc.puuid === summoner.puuid)
    ) {
      setError("This account is already added");
      return;
    }
    if (summoner?.puuid) {
      addSubAccount(summoner, player?.mainAccount?.puuid);
      setError(null);
    }
    setPlayerInput("");
  };
  function handleKeyPressed(event: any) {
    if (event.key === "Enter") {
      handleSubAccountOnClick();
    }
  }

  const deleteAccountOnClick = (type: string, account: IPlayer) => {
    type === "main" ? removeMainAccount(account) : removeSubAccount(account);
    removeMainAccount(account);
  };
  function handleEditModal() {
    setOpenModal(!openModal);
  }

  function getProfileIcon(searchAccount: IPlayer): string | undefined {
    // Find the account with the matching puuid
    const account = accounts.find(acc => acc.mainAccount.puuid === searchAccount.puuid);
    
    // If account is found, get the first profileIcon using optional chaining and array destructuring
    const profileIcon = account ? Object.values(account.matches).map(match => match.profileIcon)[0] : undefined;
    return profileIcon;
  }
  
  const positionSvgMap: Record<string, string> = {
    TOP: topSvg,
    JUNGLE: jungleSvg,
    MIDDLE: midSvg,
    BOTTOM: adcSvg,
    UTILITY: supportSvg,
  };
  const position = getMostPlayedPosition(player?.matches);
  const positionSvg = positionSvgMap[position?.toUpperCase()] || topSvg;
  const profileIconUrl = getProfileIcon(player.mainAccount)
  return (
    <div className=" max-w-[320px] w-auto h-auto font-outfit rounded-lg ring-light-green ring-1 p-3 bg-gradient-to-r from-light-green to-transparent overflow-x-auto">
      <div className="text-white pb-5 justify-center items-center flex gap-4 h-auto w-full">
        <p className="p-1 border border-white rounded-md ">
          <Image
            src={positionSvg}
            alt="My SVG"
            width={30}
            height={30}
            className=""
          />
        </p>
        {!isCollapse ? (
          <>
            <span className="pl-4 font-normal border border-white  h-auto w-full py-1 rounded-md">
              {player.mainAccount.gameName}
            </span>
            <span className="ml-auto hover:animate-pulse hover:scale-110">
              <button onClick={handleEditModal}>
                <EditOutlinedIcon className="text-white h-5 w-5" />
              </button>
            </span>
          </>
        ) : (
          ""
        )}
      </div>
      {player?.subAccounts?.length < 2 && (
        <div className="relative gap-2  h-auto flex items-center rounded-lg">
          {/* {!isCollapse && (
            <div className="relative w-full pb-2">
              <input
                type="text"
                className={`w-full h-auto font-normal  placeholder:text-gray-600 bg-white/40 px-3 py-2 text-gray-600 rounded-lg focus:outline-none caret-light-green  ${
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
                  onClick={() => handleSubAccountOnClick()}
                >
                  <AddIcon className="text-white rotate-90" />
                </button>
              </span>
            </div>
          )} */}
        </div>
      )}
      {error && (
        <div className="text-red-500 py-2 italic text-sm font-outfit">
          {error}
        </div>
      )}
      {player?.mainAccount && (
        <div className="flex items-center w-full gap-2 pt-2">
          {openModal && (
            <button
              className="ml-auto  hover:animate-pulse hover:scale-110 disabled:opacity-50"
              onClick={() => {
                deleteAccountOnClick("main", player.mainAccount);
                addMainAccount(player.subAccounts[0]);
              }}
              disabled={player.subAccounts.length === 0}
            >
              <CloseIcon className="text-white hover:text-red-500 disabled:" />
            </button>
          )}
          {!isCollapse ? (
            <p
              className={`text-white h-12 bg-white/20 flex items-center gap-4 rounded-lg w-full pl-2`}
            >
               <Image
              alt="test"
              src={profileIconUrl || ""}
              width={20}
              height={20}
              className="w-fit h-fit rounded-md"
            />  {`${player.mainAccount.gameName}#${player.mainAccount.tagLine}`}
            </p>
          ) : (
            <p className="flex justify-center w-full">
            <Image
              alt="test"
              src={profileIconUrl || ""}
              width={40}
              height={40}
              className="w-fit h-fit"
            />
            </p>
          )}
        </div>
      )}
      {player?.subAccounts?.map((account: any) => (
        <div
          key={account.puuid}
          className="flex items-center w-full gap-2 pt-2"
        >
          {openModal && (
            <button
              className="ml-auto enabled:hover:animate-pulse enabled:hover:scale-110 disabled:opacity-50"
              onClick={() => deleteAccountOnClick("sub", account)}
              //disabled={player.subAccounts.length === 2}
            >
              <CloseIcon className="text-white hover:text-red-500 disabled:" />
            </button>
          )}
          <p
            className={`text-red-200 h-10 bg-white/20 flex items-center rounded-lg w-full pl-2 `}
          >
         {`${account.gameName}#${account.tagLine}`}
          </p>
        </div>
      ))}
    </div>
  );
}
