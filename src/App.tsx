import {useRef, useState} from 'react'
import './App.css'
import {MapComponent, MapContainer} from "./containers/MapComponent";
import {useStore} from "./services/Store.ts";
import {Map as MapOL} from 'ol';
import {PolygonLayer} from "./containers/PolygonLayer";
import {EditButton} from './containers/EditButton';
import {ButtonsBlock} from "./containers/ButtonsBlock";


function App() {
  const {SettingsService} = useStore();

  const mapRef = useRef<MapComponent>(null);
  const [map, setMap] = useState<MapOL>();
  const [isEditablePolygon, setEditablePolygon] = useState(false);

  return (
    <>
      <ButtonsBlock>
        <EditButton isActive={isEditablePolygon} changeStatus={setEditablePolygon} />
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
            show={true}
            isEdit={isEditablePolygon}
          />
        )}
      </MapContainer>
    </>
  )
}

export default App
