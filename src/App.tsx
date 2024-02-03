import {useCallback, useEffect, useRef, useState} from 'react'
import './App.css'
import {MapComponent, MapContainer} from "./containers/MapComponent";
import {useStore} from "./services/Store.ts";
import {Map as MapOL} from 'ol';
import {PolygonLayer} from "./containers/PolygonLayer";
import {ButtonsBlock} from "./containers/ButtonsBlock";
import {EditButton} from './containers/EditButton';
import {RemovePolygonButton} from "./containers/RemovePolygonButton";

function App() {
  const {SettingsService} = useStore();

  const mapRef = useRef<MapComponent>(null);
  const [map, setMap] = useState<MapOL | null>();
  const [isEditablePolygon, setEditablePolygon] = useState(false);
  const [isRemovePolygon, setRemove] = useState(false);
  const [population, setPopulation] =useState<number | null>(null);

  useEffect(() => {
    if (isEditablePolygon) {
      setRemove(false);
    }
  }, [isEditablePolygon]);

  useEffect(() => {
    if (isRemovePolygon) {
      setEditablePolygon(false);
    }
  }, [isRemovePolygon]);

  const getPopulation = useCallback((geoJsonStr: string) => {
    fetch('https://gis01.rumap.ru/4898/areaStatistics?' + new URLSearchParams({
      'guid': '93BC6341-B35E-4B34-9DFE-26796F64BBB7',
      'geojson': geoJsonStr,
      'geometry': '1'
    }))
      .then((res) => res.json())
      .then((res) => {
        setPopulation(res.population_rsv);
      })
  }, []);

  return (
    <>
      <ButtonsBlock>
        <EditButton isActive={isEditablePolygon} changeStatus={setEditablePolygon} />
        <RemovePolygonButton isActive={true} changeStatus={() => {
          setRemove(true);
        }} />
      </ButtonsBlock>
      <MapContainer>
        <MapComponent
          ref={mapRef}
          defaultCenter={SettingsService.mapCenter}
          defaultZoom={SettingsService.mapZoom}
          onLoadMap={setMap}
        />
        {map && (
          <PolygonLayer
            map={map}
            isEdit={isEditablePolygon}
            isRemovePolygon={isRemovePolygon}
            finishedEdit={getPopulation}
            population={population}
          />
        )}
      </MapContainer>
    </>
  )
}

export default App
