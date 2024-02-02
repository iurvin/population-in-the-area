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
    // map.on('pointermove', this.pointerMove);
    // map.on('click', this.onClickMap);
    // map.on('moveend', this.onMoveEnd);
    // map.getViewport().addEventListener('mouseout', this.mouseOutListener);
    // window.addEventListener('mouseout', this.onWindowMouseOut);
  }
}

export const MapAPI = new MapService();

