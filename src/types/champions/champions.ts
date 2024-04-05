export interface IRefinedChampionOutput {
    championName: string;
    championId: number;
    death: number;
    kills: number;
    assists: number;
    position: string;
    summonerName: string;
    minionsKilled: number;
    neutralMinionsKilled: number;
    win: boolean;
    timePlayed: number;
    partyType: string;
}

export interface IChampionOutput extends IRefinedChampionOutput {
    kda : number;
    killParticipation: number;
    csPerMin: number;

}