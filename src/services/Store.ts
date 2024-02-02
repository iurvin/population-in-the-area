import {createContext, useContext} from "react";
import {MapService, MapAPI} from "./MapService.ts";
import {SettingsService, SettingsAPI} from "./SettingsService.ts";

export interface Store {
  MapService: MapService;
  SettingsService: SettingsService;
}

export const store: Store = {
  MapService: MapAPI,
  SettingsService: SettingsAPI,
}

export const StoreContext = createContext<Store>(store);

export function useStore() {
  return useContext(StoreContext);
}