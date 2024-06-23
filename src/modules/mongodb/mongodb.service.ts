export type MongoDbService = {
    getUserFromDb(username: string): Promise<unknown>
    // insertUserToDb(user: any): Promise<unknown>
    // getChampionFromDb(championId: string): Promise<unknown>
    // insertChampionToDb(champion: any): Promise<unknown>
    // getMatchFromDb(matchId: string): Promise<unknown>
    // insertMatchToDb(match: any): Promise<unknown>
    // getSummonerFromDb(summonerName: string): Promise<unknown>
    // insertSummonerToDb(summoner: any): Promise<unknown>
}