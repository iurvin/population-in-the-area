import VectorSource from "ol/source/Vector";
import {Geometry} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import {Feature} from "ol";
import {Map as MapOL} from 'ol';
import {Component} from "react";

export interface MapLayerProps {
  map: MapOL;
  show: boolean;
}

export class PolygonLayer<T> extends Component<MapLayerProps & T, any>{
  source = new VectorSource<Feature<Geometry>>();

  editSource = new VectorSource<Feature<Geometry>>();

  layer: VectorLayer<any> | undefined;

  editLayer: VectorLayer<any> | undefined;

  modify = new Modify({source: this.editSource});

  draw = new Draw({
    source: this.editSource,
    type: 'Polygon',
    style: {
      'fill-color': 'rgba(255, 255, 255, 0.2)',
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  });

  snap = new Snap({source: this.editSource});

  createLayers() {
    this.layer = new VectorLayer({
      source: this.source,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      },
      zIndex: 50,
    });
    this.editLayer = new VectorLayer({
      source: this.editSource,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      },
      zIndex: 51,
    });
  }

  startEdit() {
    this.props.map.addInteraction(this.modify);
    this.props.map.addInteraction(this.snap);
    if (this.editSource.getFeatures().length === 0) {
      this.props.map.addInteraction(this.draw);
      this.draw.on('drawend', (e) => {
        this.props.map.removeInteraction(this.draw);
        // if (this.props.onAddFeature) {
        //   this.props.onAddFeature();
        // }
      });
    }
  }

  stopEdit() {
    this.props.map.removeInteraction(this.modify);
    this.props.map.removeInteraction(this.draw);
    this.props.map.removeInteraction(this.snap);
  }

  addLayers() {
    debugger;
    this.createLayers();
    this.startEdit();
    if (this.editLayer) {
      this.props.map.addLayer(this.editLayer);
    }
  }

  removeLayers() {
    if (this.editLayer) {
      this.props.map.removeLayer(this.editLayer);
    }
  }

  componentDidMount() {
    if (this.props.show) {
      this.addLayers();
    }
    // this.updateSource();
  }

  componentWillUnmount() {
    this.removeLayers();
  }

  render(): JSX.Element | null {
    return null;
  }
}