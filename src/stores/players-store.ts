import { IMatch } from "@/types/matches/matches";
import { IPlayer } from "@/types/player";
import { createStore } from "zustand/vanilla";
// state
export interface IPlayerAccountsAndMatches {
  mainAccount: IPlayer;
  subAccounts: IPlayer[];
  matches: IMatch[];
}
export interface IPlayerState {
  players: IPlayerAccountsAndMatches[];
}
// actions
export type IPlayerActions = {
  addPlayer: (player: IPlayer) => void;
  removePlayer: (player: IPlayer) => void;
  addSubAccount: (player: IPlayer) => void;
  removeSubAccount: (player: IPlayer) => void;
  addMatch: (playerPuuid: string, match: any) => void;
  removeMatch: (player: IPlayer) => void;
};
export const defaultInitialState: IPlayerState = {
  players: [],
};
export type PlayerStore = IPlayerState & IPlayerActions;

export const createPlayerStore = (
  initialState: IPlayerState = defaultInitialState
) => {
  return createStore<PlayerStore>()((set) => ({
    ...initialState,
    addPlayer: (player: IPlayer) => {
      set((state) => ({
        players: [
          ...state.players,
          { mainAccount: player, subAccounts: [], matches: [] },
        ],
      }));
    },
    removePlayer: (player: IPlayer) => {
      set((state) => ({
        players: state.players.filter(
          (p) => p.mainAccount.puuid !== player.puuid
        ),
      }));
    },
    addSubAccount: (player: IPlayer) => {
      set((state) => ({
        players: state.players.map((p) => {
          return {
            ...p,
            subAccounts: [...p.subAccounts, player],
          };
        }),
      }));
    },
    removeSubAccount: (player: IPlayer) => {
      set((state) => ({
        players: state.players.map((p) => {
          return {
            ...p,
            subAccounts: p.subAccounts.filter((s) => s.puuid !== player.puuid),
          };
        }),
      }));
    },
    addMatch: (player: any, match: any) => {
      set((state) => ({
        players: state.players.map((p) => {
          return {
            ...p,
            matches: [{summonerPuuid: player},match],
          };
        }),
      }));
    },
   // remove a match based on the player.puuid
    removeMatch: (player: IPlayer) => {
      set((state) => ({
        players: state.players.map((p) => {
          return {
            ...p,
            matches: p.matches.filter((m) => m.summonerPuuid !== player.puuid),
          };
        }),
      }));
    },
  }));
};
