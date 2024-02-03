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
  const [map, setMap] = useState<MapOL>();
  const [isEditablePolygon, setEditablePolygon] = useState(false);
  const [isRemovePolygon, setRemove] = useState(false);

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

  const getPopulation = useCallback((coords: number[][]) => {
    console.log('getPopulation coords', coords)
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
          />
        )}
      </MapContainer>
    </>
  )
}

export default App
