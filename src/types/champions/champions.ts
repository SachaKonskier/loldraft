export interface IRefinedChampionOutput {
    championName: string;
    championId: number;
    death: number;
    kills: number;
    assists: number;
    position: string;
    summonerName: string;
    minionsKilled: number;
    win: boolean;
    timePlayed: number;
    partyType: string;
    gameType: string;
}

export interface IChampionOutput extends IRefinedChampionOutput {
    kda : number;
    killParticipation: number;
    csPerMin: number;
}

export interface IChampionDisplayedData {
    assists: number;
    championBgImg: string;
    championImg: string;
    csPerMinute: string;
    deaths: number;
    kda: string;
    killParticipation: string;
    kills: number;
    losses: number;
    minionsKilled: number;
    name: string;
    positions: string[];
    totalGames: number;
    winrate: string;
    wins: number;
    timePlayed: number;
    totalFetchedGames: number;
}