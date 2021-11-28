import { useContext, createContext } from "react";
import RootStore, { RootStoreModel } from "./RootStore";

export const initialState = {
  uiState: {
    version: "v1",
  },
  locations: {},
};

// @ts-ignore
export const rootStore = (window.store = RootStore.create(initialState));

const RootStoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export function useStore() {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("Store cannot be null");
  }
  return store;
}

export const Provider = RootStoreContext.Provider;
