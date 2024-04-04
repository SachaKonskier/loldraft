export type RiotService = {
    getSummonerPuuid(summonerName: string, summonerTag:string): Promise<unknown>
    getRawMatchList(puuid: string): Promise<unknown>
    getFilteredMatchList(puuid:string,matchs: string[]): Promise<unknown>
}