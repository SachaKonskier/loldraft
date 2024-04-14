// React & Next
import Image from "next/image";
import { useEffect, useState } from "react";
// Icons & Svg
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import svgTop from "../../public/top.svg";
import { IPlayer } from "@/types/player";
// Utils
import { getSummoner } from "@/utils/utils";

export default function PlayerCardComponent({ player }: { player: IPlayer }) {
  const [playerInput, setPlayerInput] = useState("");
  const [subAccounts, setSubAccounts] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<any>();
  useEffect(() => {
    
      setSubAccounts([...subAccounts, player]);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);
  const handleSubAccountOnClick = async () => {
    const summoner = (await getSummoner(playerInput)) as any;
    if (summoner?.error && summoner.error?.includes("error")) {
      setError("We are not able to find this account");
      return;
    }
    if (summoner?.puuid) {
      setSubAccounts([...subAccounts, summoner]);
      setError(null);
    }
    setPlayerInput("");
  };
  function handleKeyPressed(event: any) {
    if (event.key === "Enter") {
      handleSubAccountOnClick();
    }
  }
  const deletePlayerOnClick = (player: any) => {
     player = [];
  }
  const deleteAccountOnClick = (account: string) => {
    setSubAccounts(subAccounts.filter((item: any) => item !== account));
  };
  function handleEditModal() {
    setOpenModal(!openModal);
  }
  console.log("in playerCard", player);
  return (
    <div className=" max-w-[320px] w-auto h-auto font-outfit rounded-lg ring-light-green ring-1 p-3 bg-gradient-to-r from-light-green to-transparent overflow-x-auto">
      <div className="text-white pb-5 justify-center items-center flex gap-4 h-auto w-full">
        <p className="p-1 border border-white rounded-md ">
          <Image
            src={svgTop}
            alt="My SVG"
            width={30}
            height={30}
            className=""
          />
        </p>
        <span className="pl-4 font-semibold border border-white  h-auto w-full py-1 rounded-md">
          {player.gameName}
        </span>
        <span className="ml-auto">
          <button onClick={handleEditModal}>
            <EditOutlinedIcon className="text-white h-5 w-5" />
          </button>
        </span>
      </div>
      {subAccounts.length < 3 && (
        <div className="relative gap-2  h-auto flex items-center rounded-lg">
          <div className="relative w-full pb-2">
            <input
              type="text"
              className={`w-full h-auto font-normal  placeholder:text-gray-600 bg-white/40 px-3 py-2 text-gray-600 rounded-lg focus:outline-none caret-light-green ${
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
        </div>
      )}
      {/* {player && (
        <div className="flex items-center w-full gap-2">
          {openModal &&  <button
              className="ml-auto"
              onClick={() => deletePlayerOnClick(player)}
            >
              <CloseIcon className="text-white hover:text-red-500" />
            </button>}
          <p
            className={`text-white h-10 bg-white/20 flex items-center rounded-lg w-full pl-2`}
          >
            {`${player.gameName}#${player.tagLine}`}
          </p>
        </div>
      )} */}
      {subAccounts.map((account: any) => (
        <div key={account} className="flex items-center w-full gap-2 pt-2">
          {openModal && (
            <button
              className="ml-auto"
              onClick={() => deleteAccountOnClick(account)}
            >
              <CloseIcon className="text-white hover:text-red-500" />
            </button>
          )}
          <p
            className={`text-white h-10 bg-white/20 flex items-center rounded-lg w-full pl-2`}
          >
            {`${account.gameName}#${account.tagLine}`}
          </p>
        </div>
      ))}
     {openModal &&  <div className="pt-5 flex justify-between gap-6">
        <button className="py-[6px] px-3 italic font-outfit text-white border-2 border-white opacity-80 rounded-lg w-[120px]">
          Cancel
        </button>
        <button className="py-[6px] px-3 italic font-outfit text-white border-white opacity-80 rounded-lg w-[120px] bg-light-green">
          Save
        </button>
      </div>}
    </div>
  );
}
