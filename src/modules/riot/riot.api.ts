import { useQuery } from "@tanstack/react-query";
import { RiotService } from "./riot.service";

const backendUrl = process.env.BACKEND_URL;
// RiotAPI Interface implementation
/**
 * Riot API
 * @param summonerName
 * @param summonerTag
 * @returns puuid
 */
export const RiotApi: RiotService = {
  getSummonerPuuid: async (summonerName, summonerTag) => {
    try {
      const response = await fetch(`${backendUrl}/riot/summoner?summonerName=${summonerName}&summonerTag=${summonerTag}`)
          // `${riotUrl}/${summonerName}/${summonerTag}?api_key=${apiKey}`,
          // { 
          //     method: "GET",
     
          //     redirect: 'follow',
          //     headers: {
          //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          //         "Accept-Language": "es-ES,es;q=0.9,en;q=0.8,en-GB;q=0.7",
          //         "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                 
          //     }
          // }
     
      console.log('response', response)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
    
      if (res.status && res.status.status_code === 404) {
        return 'error summoner not found';
      }
     if(res && res.puuid) {
      return res.puuid;
    }
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
  },
};