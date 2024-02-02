import {makeObservable, observable} from "mobx";
import {MapLayerType} from "../containers/MapComponent/MapComponent.tsx";

export class SettingsService {
  @observable
  mapCenter: number[] = [50.18634217071583, 53.226035343820456];

  @observable
  mapZoom: number = 10;

  @observable
  mapLayer: MapLayerType = MapLayerType.OSM;

  constructor() {
    makeObservable(this);
  }
}

export const SettingsAPI = new SettingsService();