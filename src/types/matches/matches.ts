export interface IRawChampionResultPerMatch {
    summonerPuuid: string
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
    visionScore: number;
}

export interface IRefinedChampionOutput extends IRawChampionResultPerMatch {
    kda : number;
    killParticipation: number;
    csPerMin: number;
    
}

export interface IRefinedChampionDisplayedData {
    summonerPuuid: string;
    profileIcon: string;
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

export interface IMatch {
    matches : IRefinedChampionDisplayedData[];
}