import { LoaderLogo } from "@/shared/ui/loader-logo";
import { useState } from "react";
import Map, { ScaleControl } from "react-map-gl/maplibre";
import styles from "./MapView.module.css";

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;

export default function MapView() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section aria-label="Карта гидромониторинга" className={styles.map}>
      <Map
        initialViewState={{
          longitude: 37.6173,
          latitude: 55.7558,
          zoom: 9,
        }}
        mapStyle={mapStyleUrl}
        onLoad={() => setMapLoaded(true)}
      >
        <ScaleControl position="bottom-left" />
      </Map>
      {!mapLoaded && (
        <div className={styles.mapLoader} aria-label="Карта загружается">
          <LoaderLogo size={72} label="Карта загружается" />
        </div>
      )}
    </section>
  );
}
    
