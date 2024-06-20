// Api Services
import { RiotApi } from "@/modules/riot/riot.api";
import { ISearchAccounts } from "@/stores/players-store";
const riotApi = RiotApi;
export const mostPlayedPosition = (positions: any) => {
    if (positions == undefined) return { position: null, count: 0 };
    if (!positions.length) return { position: null, count: 0 };
    
    return positions.reduce((acc: any, position: any) => {
        const count = positions.filter((p: any) => p === position).length;
        return count > acc.count ? { position, count } : acc;
    }, { position: null, count: 0 });
}

export async function getSummoner(input:string) {
    const summonerName = input.split("#")[0] ?? '';
    const summonerTag = input.split("#")[1] ?? '';
    const result = await riotApi.getSummonerPuuid(summonerName, summonerTag);
    return result;
}

export function getMostPlayedPosition(data: any) {
    let positions = [];
    for (const champion in data) {
      positions.push(data[champion].positions[0]);
    }
    return positions?.sort((a, b) => positions?.filter((v) => v === a)?.length - positions?.filter((v) => v === b)?.length).pop();
  }
export  function checkInputFormat(input: string, setError: any) {
    // if the the input is more that 22 char it's not a valid input
    if (input.length > 22) {
      setError("summoner", {
        type: "manual",
        message: 'Invalid format input: too long (max 22)',
      });
      return false;
    }
    // if there is no # in the input it's not a valid input
    if (!input.includes("#")) {
      setError("summoner", {
        type: "manual",
        message: 'Invalid format input: missing #',
      });
      return false;
    }
    // if the input has more than one # it's not a valid input
    if (input.split("#").length > 2) {
      setError("summoner", {
        type: "manual",
        message: 'Invalid format input: too many #',
      });
      return false;
    }
    // if the input before the split is more that 16 char it's not a valid input
    if (input.split("#")[0].length > 16) {
      setError("summoner", {
        type: "manual",
        message: 'Invalid format input: too long before # (max 16)',
      });
      return false;
    }
    // if the input after the split is more that 6 char it's not a valid input
    if (input.split("#")[0].length <= 16 && input.split("#")[1].length > 5) {
      setError("summoner", {
        type: "manual",
        message: 'Invalid format input: too long after # (max 5)',
      });
      return false;
    }
    return true;
  }
  export function playerExists(accounts: ISearchAccounts[], playerInput: string) {
    if (
      !accounts.some((account) =>
        account.mainAccount.gameName.includes(playerInput)
      )
    ) {
      return false;
    }
    return true;
  }
