import Map, { ScaleControl } from "react-map-gl/maplibre";
import styles from "./MapView.module.css";

const mapStyleUrl = import.meta.env.VITE_MAP_STYLE_URL;

export default function MapView() {
  return (
    <section aria-label="Карта гидромониторинга" className={styles.map}>
      <Map
        initialViewState={{
          longitude: 37.6173,
          latitude: 55.7558,
          zoom: 9,
        }}
        mapStyle={mapStyleUrl}

      >
        <ScaleControl position="bottom-left" />
      </Map>
    </section>
  );
}
    