import {makeObservable, observable} from "mobx";

export class SettingsService {
  @observable
  mapCenter: number[] = [30, 60];

  @observable
  mapZoom: number = 10;

  @observable
  mapLayer = 'OSM';

  constructor() {
    makeObservable(this);
  }
}

export const SettingsAPI = new SettingsService();