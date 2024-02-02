import {Map as MapOL} from 'ol';
import {makeObservable} from "mobx";

export class MapService {
  public map: MapOL | null = null;
  public zoom: number | undefined;

  constructor() {
    makeObservable(this);
  }

  assignMap(map: MapOL) {
    this.map = map;
    this.zoom = map.getView().getZoom();
  }
}

export const MapAPI = new MapService();

