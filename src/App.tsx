import {useRef, useState} from 'react'
import './App.css'
import {MapComponent, MapContainer} from "./containers/MapComponent";
import {useStore} from "./services/Store.ts";
import {Map as MapOL} from 'ol';


function App() {
  const {SettingsService} = useStore();

  const mapRef = useRef<MapComponent>(null);
  const [map, setMap] = useState<MapOL>();

  return (
    <>
      <MapContainer>
        <MapComponent
          ref={mapRef}
          defaultCenter={SettingsService.mapCenter}
          defaultZoom={SettingsService.mapZoom}
          // currentLayer={SettingsService.mapLayer}
          onLoadMap={setMap}
        />
      </MapContainer>
    </>
  )
}

export default App
