import {Component, createRef, ReactNode} from "react";
import {Feature, Map as MapOL, MapBrowserEvent, Geolocation, View, Overlay, Collection} from 'ol';
import {Geometry} from "ol/geom";
import {Style} from "ol/style";
import {MapService, MapAPI} from "../../services/MapService.ts";
import OLMap from 'ol/Map.js';
import LayerGroup from 'ol/layer/Group';
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import BaseLayer from "ol/layer/Base";
import {to4326} from "../../utils/map.ts";

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
  eventCoordinate: number[];
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
  mapContainer = createRef<HTMLDivElement>();

  state: State = {
    map: null,
    eventCoordinate: [0, 0],
  };

  MAX_ZOOM = 22;

  MIN_ZOOM = 4;

  baseLayers = new LayerGroup({
    layers: [],
    zIndex: 0,
  });

  geolocation = new Geolocation({
    tracking: true,
    trackingOptions: {
      enableHighAccuracy: true,
    },
  });

  userCoordinates: Array<number> | undefined;

  overlay = new Overlay({
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  MapTilerStyles = {
    light: {
      id: '93BC6341-B35E-4B34-9DFE-26796F64BBB7',
    },
  };

  positionFeature: Feature | null = null;

  componentDidMount() {
    this.initMap();
  }

  initMap() {
    debugger
    if (this.mapContainer.current) {
      const map = new OLMap({
        layers: [this.baseLayers],
        view: new View({
          zoom: this.props.defaultZoom,
          center: fromLonLat(this.props.defaultCenter),
          maxZoom: this.MAX_ZOOM,
          minZoom: this.MIN_ZOOM,
        }),
        controls: [],
        target: this.mapContainer.current,
        overlays: [this.overlay],
      });

      this.getMap().assignMap(map);

      map.on('moveend', (e) => {
        const currentZoom = e.map.getView().getZoom() ?? 0;

        if (currentZoom <= this.MIN_ZOOM) {
          e.map.getView().setZoom(this.MIN_ZOOM);
        }

        if (currentZoom >= this.MAX_ZOOM) {
          e.map.getView().setZoom(this.MAX_ZOOM);
        }

        this.onChangeBoundary();
      });
    }
  }

  getMap(): MapService {
    return this.props.mapAPI ? this.props.mapAPI : MapAPI;
  }

  public setLayer(): void {
    // if (layer === MapLayerType.MapTiler) {
    //   const styleJson = `${process.env.REACT_APP_MAP_TILES}/styles/basic/style.json`;
    //   this.applyStyleLayer(styleJson);
    // }
    // if (layer === MapLayerType.DarkTiler) {
    //   const layer = new TileLayer({
    //     source: new OSM({
    //       url: `${process.env.REACT_APP_MAP_TILES}/styles/dark_matter_nn_ver_1/{z}/{x}/{y}@2x.webp`,
    //     }),
    //   });
    //
    //   if (this.state.map) {
    //     this.state.map.getTargetElement().style.background = 'rgba(13,23,40,255)';
    //   }
    //
    //   this.baseLayers.setLayers(new Collection<BaseLayer>([layer]));
    // }
    // if (layer === MapLayerType.OSM) {

    const layer = new TileLayer({
        source: new OSM({
          url: 'http://tile.digimap.ru/rumap/{z}/{x}/{y}.png?guid=93BC6341-B35E-4B34-9DFE-26796F64BBB7',
        }),
        zIndex: 1,
      });
      // if (this.state.map) {
      //   this.state.map.getTargetElement().style.background = 'rgba(255, 255, 255, 0)';
      // }
      this.baseLayers.setLayers(new Collection<BaseLayer>([layer]));
    }
    // if (layer === MapLayerType.Yandex) {
    //   const yandexSource = new XYZ({
    //     url: 'https://ya-cache.mvs.group/m3/tiles?l=map&v=18.01.10-2&x={x}&y={y}&z={z}&scale=2&lang=ru_RU',
    //     crossOrigin: 'anonymous',
    //     projection: 'EPSG:3395',
    //     tilePixelRatio: 2,
    //     tileGrid: createXYZ({
    //       maxZoom: 18,
    //       extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
    //     }),
    //   });
    //   const yandexLayer = new Tile({
    //     source: yandexSource,
    //   });
    //   this.baseLayers.setLayers(new Collection<BaseLayer>([yandexLayer]));
    // }
  // }

  private onChangeBoundary() {
    if (this.state.map) {
      const {map} = this.state;
      const coords = map.getView().calculateExtent(map.getSize());
      const leftTop = to4326([coords[2], coords[1]]);
      const rightBottom = to4326([coords[0], coords[3]]);
      // const center = map.getView().getCenter();
      // if (center) {
      //   try {
      //     SettingsAPI.saveCenter(to4326(center), map.getView().getZoom());
      //   } catch (e) {
      //     console.error('error', e);
      //   }
      // }

      if (this.props?.onChangeBoundary instanceof Function) {
        this.props.onChangeBoundary(leftTop, rightBottom);
      }
    }
  }

  render(): JSX.Element {
    const {children} = this.props;
    debugger;
    return (
      <>
        <div
          id="map"
          ref={this.mapContainer}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {children}
      </>


    );
  }
}