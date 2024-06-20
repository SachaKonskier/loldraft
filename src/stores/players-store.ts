import { IMatch } from "@/types/matches/matches";
import { IPlayer } from "@/types/player";
import { createStore } from "zustand/vanilla";
// state

export interface ISearchAccounts {
  mainAccount: IPlayer;
  subAccounts: IPlayer[];
  matches: IMatch[];
}
export interface IPlayerState {
  accounts: ISearchAccounts[];
}
// actions
export type IPlayerActions = {
  addMainAccount: (mainAccount: IPlayer) => void;
  removeMainAccount: (account: IPlayer) => void;
  addSubAccount: (subAccount: IPlayer, mainAccountPuuid: string) => void;
  removeSubAccount: (account: IPlayer) => void;
  addMatches: (puuid: string, matches: IMatch[]) => void;
  updateMatches: (puuid: string, matches: IMatch[]) => void;
};
export const defaultInitialState: IPlayerState = {
  accounts: [],
};
export type PlayerStore = IPlayerState & IPlayerActions;

export const createPlayerStore = (
  initialState: IPlayerState = defaultInitialState
) => {
  return createStore<PlayerStore>()((set) => ({
    ...initialState,
    addMainAccount: (mainAccount: IPlayer) =>
      set((state) => ({
        accounts: [
          ...state.accounts,
          {
            mainAccount,
            subAccounts: [],
            matches: [],
          },
        ],
      })),
    removeMainAccount: (account: IPlayer) =>
      set((state) => ({
        accounts: state.accounts.filter(
          (acc) => acc.mainAccount.puuid !== account.puuid
        ),
      })),
    addSubAccount: (subAccount: IPlayer, mainAccountPuuid: string) =>
      set((state) => ({
        accounts: state.accounts.map((acc) => {
          if (acc.mainAccount.puuid === mainAccountPuuid) {
            return {
              ...acc,
              subAccounts: [...acc.subAccounts, subAccount],
            };
          }
          return acc;
        }),
      })),
    removeSubAccount: (account: IPlayer) =>
      set((state) => ({
        accounts: state.accounts.map((acc) => ({
          ...acc,
          subAccounts: acc.subAccounts.filter(
            (subAcc) => subAcc.puuid !== account.puuid
          ),
        })),
      })),
    addMatches: (puuid: string, matches: IMatch[]) =>
      set((state) => ({
        accounts: state.accounts.map((acc) => {
          if (acc.mainAccount.puuid === puuid) {
            return {
              ...acc,
              matches,
            };
          }
          return acc;
        }),
      })),
    updateMatches: (puuid: string, matches: IMatch[]) =>
      set((state) => ({
        accounts: state.accounts.map((acc) => {
          if (acc.mainAccount.puuid === puuid) {
            return {
              ...acc,
              matches: [...acc.matches, ...matches],
            };
          }
          return acc;
        }),
      })),
  }));
};
