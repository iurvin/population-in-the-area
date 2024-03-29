import {Component, createRef, ReactNode} from "react";
import {Feature, Map as MapOL, MapBrowserEvent, View, Overlay, Collection} from 'ol';
import {Geometry} from "ol/geom";
import {Style} from "ol/style";
import {MapService, MapAPI} from "../../services/MapService.ts";
import OLMap from 'ol/Map.js';
import LayerGroup from 'ol/layer/Group';
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import BaseLayer from "ol/layer/Base";
import {defaults as defaultInteractions} from 'ol/interaction.js';

interface State {
  map: MapOL | null;
  eventCoordinate: number[];
}

interface Props {
  onChangeBoundary?: () => void;
  defaultCenter: number[];
  defaultZoom: number;
  selectedFeature?: Feature<Geometry> | null;

  onSelectFeature?: () => void;
  onClickMap?: (event: MapBrowserEvent<UIEvent>) => void;
  onLoadMap?: (map: OLMap | null) => void;

  children?: ReactNode;

  theme?: string;

  editMode?: boolean;

  isUseRuler?: boolean;
  onTurnOffRuler?: () => void;
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

  overlay = new Overlay({
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  componentDidMount() {
    this.initMap();
  }

  private onLoadMap() {
    if (this.props.onLoadMap) {
      this.props.onLoadMap(this.state.map);
    }
  }

  initMap() {
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
        interactions: defaultInteractions({
          doubleClickZoom: false,
        }),
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
      });

      this.setState({map}, () => {
        this.setLayer();
        this.onLoadMap();
      });
    }
  }

  getMap(): MapService {
    return this.props.mapAPI ? this.props.mapAPI : MapAPI;
  }

  public setLayer(): void {
    const layer = new TileLayer({
      source: new OSM({
        url: 'http://tile.digimap.ru/rumap/{z}/{x}/{y}.png?guid=93BC6341-B35E-4B34-9DFE-26796F64BBB7',
      }),
      zIndex: 1,
    });

    if (this.state.map) {
      this.state.map.getTargetElement().style.background = 'rgba(255, 255, 255, 1)';
    }

    this.baseLayers.setLayers(new Collection<BaseLayer>([layer]));
  }

  render(): JSX.Element {
    const {children} = this.props;
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