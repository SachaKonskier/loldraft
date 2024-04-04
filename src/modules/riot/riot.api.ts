import { useQuery } from "@tanstack/react-query";
import { RiotService } from "./riot.service";
const riotUrl =
  "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const apiKey = "RGAPI-0d30a671-d332-4f38-aa73-933e76ff6f10";
export const RiotApi: RiotService = {
  getSummonerPuuid: async (summonerName, summonerTag) => {
    try {
        console.log('url', `${riotUrl}/${summonerName}/${summonerTag}?api_key=${apiKey}`)
      const response = await fetch(
        `${riotUrl}/${summonerName}/${summonerTag}?api_key=${apiKey}`,
        { method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          }
      );
          console.log('response', response)
      const data = await response
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  },
};

export const useGetSummonerPuuid = (summonerName: string, summonerTag: string) => {
    return useQuery({queryKey: ["summonerPuuid"], queryFn: () => RiotApi.getSummonerPuuid(summonerName, summonerTag)});
}