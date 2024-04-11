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
      const response = await fetch(`api/getSummoner?summonerName=${summonerName}&summonerTag=${summonerTag}`)
      console.log(response)

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();

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
      const response = await fetch(`api/getMatches?puuid=${puuid}`);
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
      const response = await fetch(`api/getMatches?matches=${matches}&summonerPuuid=${puuid}`);
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