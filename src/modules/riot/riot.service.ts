export type RiotService = {
    getSummonerPuuid(summonerName: string, summonerTag:string): Promise<unknown>
}