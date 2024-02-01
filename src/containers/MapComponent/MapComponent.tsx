import {Component, ReactNode} from "react";
import {Feature, Map as MapOL, MapBrowserEvent} from 'ol';
import {Geometry} from "ol/geom";
import {Style} from "ol/style";
import {MapService} from "../../services/MapService.ts";

export enum MapLayerType {
  'OSM' = 'OSM',
  'MapTiler' = 'MapTiler',
  'DarkTiler' = 'DarkTiler',
  'Ruler' = 'Ruler',
  'Yandex' = 'Yandex',
}

interface State {
  map: MapOL | null;
  // showContextMenu: boolean;
  // xPositionContextMenu: number;
  // yPositionContextMenu: number;
  // eventCoordinate: number[];
}

interface Props {
  onChangeBoundary?: Function;
  defaultCenter: number[];
  defaultZoom: number;
  selectedFeature?: Feature<Geometry> | null;

  onSelectFeature?: any;
  onClickMap?: (event: MapBrowserEvent<UIEvent>) => void;
  onLoadMap?: any;

  children?: ReactNode;
  currentLayer: MapLayerType;

  theme?: string;

  editMode?: boolean;

  isUseRuler?: boolean;
  onTurnOffRuler?: Function;
  onChangeLengthRuler?: (len: number) => void;
  rulerStyles?: Style | Style[];
  mapAPI?: MapService;
}

export class MapComponent extends Component<Props, State>{

}