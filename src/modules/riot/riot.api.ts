import { RiotService } from "./riot.service";

const backendUrl = process.env.BACKEND_URL;
const apiKey = process.env.RIOT_API_KEY;
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
      const response = await fetch(`api/riot/summoner?summonerName=${summonerName}&summonerTag=${summonerTag}`)
    

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res)
      if (res.status && res.status.status_code === 401) {
        return { error: 'error Unauthorized' };
      }
      if (res.status && res.status.status_code === 403) {
        return { error: 'error Wrong token' };
      }
      if (res.status && res.status.status_code === 404) {
        return { error: 'error summoner not found' };
      }
      if (res.status && res.status.status_code === 400) {
        return { error: 'error summoner not found' };
      }
     if(res && res.puuid) {
      return {puuid: res.puuid};
    }
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
  },
  /**
   * Riot API
   * @param puuid
   * @returns rawMatchList
   * */
  getRawMatchList: async (puuid) => {
    try {
      const response = await fetch(`api/riot/matches?puuid=${puuid}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const rawMatchLists = await response.json();
      return rawMatchLists;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
  },
  /**
   * Riot API
   * @param puuid
   * @param matches
   * @returns filteredMatchList
   * */
  getFilteredMatchList: async (puuid, matches) => {
    try {
      const response = await fetch(`api/riot/matches?matches=${matches}&summonerPuuid=${puuid}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const filteredMatchLists = await response.json();
      return filteredMatchLists;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
  }
};