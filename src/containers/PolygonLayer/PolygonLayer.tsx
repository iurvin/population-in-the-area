import VectorSource from "ol/source/Vector";
import {Geometry} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import {Draw, Modify, Snap} from "ol/interaction";
import {Feature, Map as MapOL} from "ol";
import {GeoJSON} from 'ol/format'
import {Component} from "react";
import {Text, Fill, Stroke, Style} from 'ol/style';

const styleText = (text: string) => {
  const font = 12;
  return new Text({
      font: font+'px Arial',
      fill: new Fill({
        color: '#FF0000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      }),
      textAlign: "center",
      textBaseline: "middle",
      text:  text,
      overflow: true
    });
}

export interface MapLayerProps {
  map: MapOL;
  isRemovePolygon: boolean;
  isEdit: boolean;
  finishedEdit: (geoJson: string)  => void;
  population: null | number;
}

export class PolygonLayer<T> extends Component<MapLayerProps & T, never>{
  editSource = new VectorSource<Feature<Geometry>>();
  editLayer: VectorLayer<VectorSource<Feature<Geometry>>> | undefined;

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
      style: () => {
        return [new Style({
          text: styleText(''),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.3)',
          }),
          stroke: new Stroke({
            color: '#FF0000',
            width: 2,
          }),
        })]
      },
      zIndex: 50,
    });
  }

  handleDblClick = () => {
    this.modify.removePoint();
  }

  handleDrawend = (e: any) => {
    this.props.map.removeInteraction(this.draw);

    const format = new GeoJSON();
    const geoJsonStr = format.writeFeatures([e.feature], { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
    this.props.finishedEdit(geoJsonStr);
  }

  handleModifyend = (e: any) => {
    const features = e.features.getArray();

    if (features.length) {
      const format = new GeoJSON();
      const geoJsonStr = format.writeFeatures(e.features.getArray(), { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
      this.props.finishedEdit(geoJsonStr);
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

  componentDidUpdate(prevProps: Readonly<MapLayerProps & T>) {
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

    if (prevProps.population !== this.props.population) {
      this.editLayer?.setStyle(new Style({
        text: styleText(typeof this.props.population === 'number' ? this.props.population.toString() : ''),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.3)',
        }),
        stroke: new Stroke({
          color: '#FF0000',
          width: 2,
        }),
      }))
    }
  }

  render(): JSX.Element | null {
    return null;
  }
}