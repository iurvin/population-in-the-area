import VectorSource from "ol/source/Vector";
import {Geometry} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import {Feature} from "ol";
import {Map as MapOL} from 'ol';
import {Component} from "react";

export interface MapLayerProps {
  map: MapOL;
  isRemovePolygon: boolean;
  isEdit: boolean;
  finishedEdit: (coords: number[][])  => void;
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
    this.editLayer = new VectorLayer({
      source: this.editSource,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.3)',
        'stroke-color': '#FF0000',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#FF0000',
      },
      zIndex: 50,
    });
  }

  handleDblClick = () => {
    this.modify.removePoint();
  }

  handleDrawend = (e: any) => {
    this.props.map.removeInteraction(this.draw);

    const feature = e.feature;
    const coords = feature.getGeometry().getCoordinates();

    this.props.finishedEdit(coords);
  }

  handleModifyend = (e: any) => {
    const features = e.features.getArray();

    if (features.length) {
      const coords = e.features.getArray()[0].getGeometry().getCoordinates();
      this.props.finishedEdit(coords);
    }
  }

  startEdit() {
    this.props.map.addInteraction(this.modify);
    this.props.map.addInteraction(this.snap);
    if (this.editSource.getFeatures().length === 0) {
      this.props.map.addInteraction(this.draw);

      this.props.map.on('dblclick', this.handleDblClick);
      this.draw.on('drawend', this.handleDrawend);
      this.modify.on('modifyend', this.handleModifyend);
    }
  }

  stopEdit() {
    this.props.map.removeEventListener('dblclick', this.handleDblClick);
    this.draw.removeEventListener('drawend', this.handleDrawend);
    this.modify.removeEventListener('modifyend', this.handleModifyend);

    this.props.map.removeInteraction(this.modify);
    this.props.map.removeInteraction(this.draw);
    this.props.map.removeInteraction(this.snap);
  }

  addLayers() {
    this.createLayers();
    if (this.props.isEdit) {
      this.startEdit();
    }
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
      this.addLayers();
  }

  componentWillUnmount() {
    this.removeLayers();
  }

  componentDidUpdate() {
    if (this.props.isRemovePolygon) {
      this.editSource.clear();
      this.removeLayers();
      this.addLayers();
    }

    if (this.props.isEdit) {
      this.startEdit();
    } else {
      this.stopEdit();
    }
  }

  render(): JSX.Element | null {
    return null;
  }
}