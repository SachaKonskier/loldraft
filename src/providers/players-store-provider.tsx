"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import { type PlayerStore, createPlayerStore } from "@/stores/players-store";

export const PlayerStoreContext = createContext<StoreApi<PlayerStore> | null>(
    null,
  )
  
export interface PlayersStoreProviderProps {
  children: ReactNode;
}
export const PlayersStoreProvider = ({
  children,
}: PlayersStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PlayerStore>>();
  if (!storeRef.current) {
    storeRef.current = createPlayerStore();
  }

    return (
        <PlayerStoreContext.Provider value={storeRef.current}>
            {children}
        </PlayerStoreContext.Provider>
    )
}

export const usePlayersStore = <T,>(
    selector: (store: PlayerStore) => T,
  ): T => {
    const playerStoreContext = useContext(PlayerStoreContext)
  
    if (!playerStoreContext) {
      throw new Error(`usePlayerStore must be use within PlayerStoreProvider`)
    }
  
    return useStore(playerStoreContext, selector)
  }