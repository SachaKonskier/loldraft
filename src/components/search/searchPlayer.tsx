// React
import { useState } from "react";
// Formik
import { useFormik } from 'formik';
// Icons
import AddIcon from "@mui/icons-material/Add";
// Types

import { checkInputFormat, getSummoner, playerExists } from "@/utils/utils";
import { usePlayersStore } from "@/providers/players-store-provider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const TITLE = "Find a Summoner!";
export default function SearchPlayer() {
  const [error, setError] = useState<any>();
  const { addMainAccount, accounts } = usePlayersStore((state) => state);
  const formik = useFormik({
    initialValues: {
      summoner: '',
    },
    onSubmit: values => {
      
      
    },
  });
  if (playerExists(accounts, formik.values.summoner)) {
    setError("This account is already in the list");
    return;
  }
  async function handleAddPlayerCard() {
  
    if (!checkInputFormat(formik.values.summoner, setError)) {
      return;
    }
    console.log('formik.values.summoner', formik.values.summoner)
    const summonerPuuid = (await getSummoner(formik.values.summoner)) as any;
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
  }
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
          <Input
            type="text"
            name="summoner"
            placeholder="Game Name + #EX"
            value={formik.values.summoner}
            onChange={formik.handleChange}
            onKeyUp={(event) => handleKeyPressed(event)}
          />
          <Button
            
            onClick={() => handleAddPlayerCard()}
            variant={"ghost"}
            className="absolute top-2 inset-y-0 right-0 pr-4 "
          >
            <AddIcon className="text-black rotate-90" />
          </Button>
          </div>
          {formik.values.summoner.length > 0 && error && (
            <div className="text-red-500 py-2 italic text-sm font-outfit">
              {error}
            </div>
          )}
       
        {/* <div className="relative">
          <Input
            type="text"
            placeholder="Game Name + #EX"
            value={selectedInput}
            onChange={(e) => setSelectedInput(e.target.value)}
            onKeyUp={(event) => handleKeyPressed(event)}
          />
          <Button
            type="submit"
            onClick={() => handleAddPlayerCard()}
            variant={"ghost"}
            className="absolute top-2 inset-y-0 right-0 pr-4 "
          >
            <AddIcon className="text-black rotate-90" />
          </Button>
        </div>
        {error && (
          <div className="text-red-500 py-2 italic text-sm font-outfit">
            {error}
          </div>
        )} */}
     
    </div>
  );
}
