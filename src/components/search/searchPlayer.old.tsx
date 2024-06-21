// React
import { useState } from "react";

// Icons
import AddIcon from "@mui/icons-material/Add";
// Types

import { getSummoner } from "@/utils/utils";
import { usePlayersStore } from "@/providers/players-store-provider";
import { ISearchAccounts } from "@/stores/players-store";
import { set } from "react-hook-form";
const TITLE = "Add a new player !";

export default function SearchPlayer() {
  const [playerInput, setPlayerInput] = useState("");
  const [error, setError] = useState<any>();
  const { addMainAccount, accounts } = usePlayersStore((state) => state);
  function checkInputFormat(input: string) {
    // if the the input is more that 22 char it's not a valid input
    if (input.length > 22) {
      setError("Invalid format input: too long");
      return false;
    }
    // if there is no # in the input it's not a valid input
    if (!input.includes("#")) {
      setError("Invalid format input: missing #");
      return false;
    }
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
    if (input.split("#")[0].length <= 16 && input.split("#")[1].length > 5) {
      setError("Invalid format input: too long after # (max 5)");
      return false;
    }
    return true;
  }
  function playerExists(accounts: ISearchAccounts[]) {
    if (
      !accounts.some((account) =>
        account.mainAccount.gameName.includes(playerInput)
      )
    ) {
      return false;
    }
    return true;
  }
  if (playerExists(accounts)) {
    setError("This account is already in the list");
    return;
  }
  const handleAddPlayerCard = async () => {
    if (!checkInputFormat(playerInput)) {
      return;
    }
    const summonerPuuid = (await getSummoner(playerInput)) as any;
    if (summonerPuuid?.error && summonerPuuid.error?.includes("error")) {
      setError("We are not able to find this account");
      return;
    }

    if (summonerPuuid?.puuid) {
      addMainAccount(summonerPuuid);
      setError(null);
    } else {
      return;
    }
  };
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
            //playerExists(accounts);
            setPlayerInput(e.target.value);
            //setError(null);
          }}
          onKeyUp={(event) => handleKeyPressed(event)}
        />

        <span className="absolute top-2 inset-y-0 right-0 pr-4 ">
          <button
            className="hover:animate-pulse hover:scale-110"
            disabled={playerInput.length === 0}
            type="submit"
            onClick={() => {
              handleAddPlayerCard();
             
            }}
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
