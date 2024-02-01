import {createContext, useContext} from "react";
import {MapService, MapAPI} from "./MapService.ts";

export interface Store {
  MapService: MapService;
}

export const store: Store = {
  MapService: MapAPI,
}

export const StoreContext = createContext<Store>(store);

export function useStore() {
  return useContext(StoreContext);
}