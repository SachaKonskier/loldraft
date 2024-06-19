// Formik
import { useForm, SubmitHandler, set } from "react-hook-form";
// Icons
import AddIcon from "@mui/icons-material/Add";
// Types

import { checkInputFormat, getSummoner, playerExists } from "@/utils/utils";
import { usePlayersStore } from "@/providers/players-store-provider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const TITLE = "Find a Summoner!";
interface IFormInput {
  summoner: string;
}
export default function SearchPlayer() {
  const {
    register,
    handleSubmit,
    getValues,
  resetField,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    handleAddPlayerCard(data.summoner);

  const { addMainAccount, accounts } = usePlayersStore((state) => state);

  if (playerExists(accounts, getValues("summoner"))) {
    setError("summoner", {
      type: "manual",
      message: "summoner already exists!",
    });
    return;
  }
  async function handleAddPlayerCard(summoner: string) {
    if (!checkInputFormat(summoner, setError)) {
      return;
    }

    const summonerPuuid = (await getSummoner(summoner)) as any;
    if (summonerPuuid?.error && summonerPuuid.error?.includes("error")) {
      setError("summoner", {
        type: "manual",
        message: "We are not able to find this account",
      });
      return;
    }

    if (summonerPuuid?.puuid) {
      addMainAccount(summonerPuuid);
    } else {
      return;
    }
    resetField("summoner");
  }

  return (
    <div className="max-w-[320px] p-3 bg-gradient-to-r from-light-green to-transparent rounded-lg border border-light-green h-full w-full">
      <h1 className="text-base font-bold italic font-outfit text-white pb-3">
        {TITLE}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Input {...register("summoner")} />

          <Button
            type="submit"
            variant={"ghost"}
            className="absolute top-2 inset-y-0 right-0 pr-4 "
            disabled={accounts.length > 4 }
          >
            <AddIcon className="text-black rotate-90" />
          </Button>
        </div>
        {errors.summoner && (
          <p className="text-red-500 text-sm italic pt-2">
            {errors.summoner.message}
          </p>
        )}
      </form>
    </div>
  );
}
