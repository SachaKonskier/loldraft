import { useQuery } from "@tanstack/react-query";
import { RiotService } from "./riot.service";
const riotUrl =
  "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id";
const apiKey = process.env.RIOT_API_KEY;
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
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
          },
          }
      );
      const data = await response.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  },
};

export const useGetSummonerPuuid = (summonerName: string, summonerTag: string) => {
    return useQuery({queryKey: ["summonerPuuid"], queryFn: () => RiotApi.getSummonerPuuid(summonerName, summonerTag)});
}