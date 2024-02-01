import {Map as MapOL} from 'ol';
import {makeObservable} from "mobx";

export class MapService {
  public map: MapOL | null = null;

  constructor() {
    makeObservable(this);
  }
}

export const MapAPI = new MapService();