// Api Services
import { RiotApi } from "@/modules/riot/riot.api";
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
